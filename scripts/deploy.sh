#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

REPO_NAME="${REPO_NAME:-huanghaijie-portfolio}"
GH="${GH_BIN:-gh}"

if command -v "$GH" >/dev/null 2>&1; then
  :
elif [[ -x "/tmp/gh-install/gh_2.74.2_macOS_arm64/bin/gh" ]]; then
  GH="/tmp/gh-install/gh_2.74.2_macOS_arm64/bin/gh"
else
  GH=""
fi

auth_with_token() {
  if [[ -z "${GITHUB_TOKEN:-}" ]]; then
    return 1
  fi
  if [[ -n "$GH" ]]; then
    printf '%s\n' "$GITHUB_TOKEN" | "$GH" auth login --with-token
    return 0
  fi
  return 0
}

ensure_auth() {
  if [[ -n "$GH" ]] && "$GH" auth status >/dev/null 2>&1; then
    return 0
  fi
  if auth_with_token && [[ -n "$GH" ]] && "$GH" auth status >/dev/null 2>&1; then
    return 0
  fi
  if [[ -n "${GITHUB_TOKEN:-}" ]]; then
    return 0
  fi

  echo "需要 GitHub 登录。请在系统终端运行以下命令之一："
  echo ""
  echo "  方式 A（推荐）：浏览器登录"
  echo "    cd \"$ROOT\" && ./scripts/deploy.sh"
  echo ""
  echo "  方式 B：使用 Personal Access Token"
  echo "    1. 打开 https://github.com/settings/tokens/new"
  echo "    2. 勾选 repo 权限，生成 token"
  echo "    3. 运行："
  echo "       GITHUB_TOKEN=你的token ./scripts/deploy.sh"
  echo ""
  if [[ -n "$GH" ]]; then
    "$GH" auth login --hostname github.com --git-protocol https --web
  else
    exit 1
  fi
}

api() {
  curl -fsSL \
    -H "Authorization: Bearer ${GITHUB_TOKEN:-$( "$GH" auth token 2>/dev/null || true )}" \
    -H "Accept: application/vnd.github+json" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    "$@"
}

ensure_auth

if [[ -n "$GH" ]]; then
  OWNER="$("$GH" api user -q .login)"
else
  OWNER="$(api https://api.github.com/user | python3 -c 'import json,sys; print(json.load(sys.stdin)["login"])')"
fi

REMOTE="https://github.com/${OWNER}/${REPO_NAME}.git"

if git remote get-url origin >/dev/null 2>&1; then
  echo "远程仓库: $(git remote get-url origin)"
else
  echo "创建仓库 ${OWNER}/${REPO_NAME} ..."
  if [[ -n "$GH" ]]; then
    "$GH" repo create "$REPO_NAME" --public --source=. --remote=origin \
      --description "黄海杰个人作品集 — SEO · 增长 · 数据" || true
  fi
  if ! git remote get-url origin >/dev/null 2>&1; then
    api -X POST "https://api.github.com/user/repos" \
      -d "{\"name\":\"${REPO_NAME}\",\"description\":\"黄海杰个人作品集 — SEO · 增长 · 数据\",\"private\":false}" >/dev/null
    git remote add origin "$REMOTE"
  fi
fi

TOKEN="${GITHUB_TOKEN:-$( "$GH" auth token 2>/dev/null || true )}"
if [[ -n "$TOKEN" ]]; then
  git remote set-url origin "https://x-access-token:${TOKEN}@github.com/${OWNER}/${REPO_NAME}.git"
fi

echo "推送代码到 GitHub ..."
git push -u origin main

echo "启用 GitHub Pages (GitHub Actions) ..."
api -X POST "https://api.github.com/repos/${OWNER}/${REPO_NAME}/pages" \
  -d '{"build_type":"workflow"}' >/dev/null 2>&1 || \
api -X PUT "https://api.github.com/repos/${OWNER}/${REPO_NAME}/pages" \
  -d '{"build_type":"workflow"}' >/dev/null || true

echo ""
echo "=========================================="
echo "  部署已触发！"
echo "  网站地址（约 1–3 分钟后生效）："
echo "  https://${OWNER}.github.io/${REPO_NAME}/"
echo "=========================================="
echo ""
if [[ -n "$GH" ]]; then
  echo "查看构建进度："
  echo "  $GH run list --repo ${OWNER}/${REPO_NAME}"
fi
