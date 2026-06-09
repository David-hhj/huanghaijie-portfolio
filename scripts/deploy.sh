#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

GH="${GH_BIN:-gh}"
REPO_NAME="${REPO_NAME:-huanghaijie-portfolio}"

if ! command -v "$GH" >/dev/null 2>&1; then
  if [[ -x "/tmp/gh-install/gh_2.74.2_macOS_arm64/bin/gh" ]]; then
    GH="/tmp/gh-install/gh_2.74.2_macOS_arm64/bin/gh"
  else
    echo "未找到 GitHub CLI (gh)。请先安装: https://cli.github.com"
    exit 1
  fi
fi

if ! "$GH" auth status >/dev/null 2>&1; then
  echo "请先登录 GitHub："
  "$GH" auth login --hostname github.com --git-protocol https --web
fi

OWNER="$("$GH" api user -q .login)"
REMOTE="https://github.com/${OWNER}/${REPO_NAME}.git"

if git remote get-url origin >/dev/null 2>&1; then
  echo "远程仓库已存在: $(git remote get-url origin)"
else
  echo "创建 GitHub 仓库: ${OWNER}/${REPO_NAME}"
  "$GH" repo create "$REPO_NAME" --public --source=. --remote=origin --push --description "黄海杰个人作品集 — SEO · 增长 · 数据"
fi

echo "推送代码..."
git push -u origin main

echo "启用 GitHub Pages (Actions)..."
"$GH" api -X POST "/repos/${OWNER}/${REPO_NAME}/pages" -f build_type=workflow 2>/dev/null || \
  "$GH" api -X PUT "/repos/${OWNER}/${REPO_NAME}/pages" -f build_type=workflow

echo ""
echo "部署已触发。约 1–3 分钟后可访问："
echo "  https://${OWNER}.github.io/${REPO_NAME}/"
echo ""
echo "查看部署状态："
echo "  $GH run list --repo ${OWNER}/${REPO_NAME}"
