#!/bin/bash
set -e

echo ""
echo "=== Деплой калькулятора поездок ==="
echo ""

# 1. Авторизация GitHub (откроется браузер)
echo "▶ Шаг 1: Войти в GitHub (откроется браузер)..."
gh auth login --hostname github.com --git-protocol https --web

# 2. Получить username
GH_USER=$(gh api user --jq .login)
echo "✓ Вы вошли как: $GH_USER"

# 3. Создать публичный репозиторий
echo ""
echo "▶ Шаг 2: Создаём репозиторий tutu-trip-calculator..."
gh repo create tutu-trip-calculator \
  --public \
  --description "Калькулятор стоимости поездки — tutu.ru style" \
  --source=. \
  --push \
  || true

# Если репо уже существует — просто пушим
git remote set-url origin "https://github.com/$GH_USER/tutu-trip-calculator.git" 2>/dev/null || \
git remote add origin "https://github.com/$GH_USER/tutu-trip-calculator.git" 2>/dev/null || true
git push -u origin main 2>/dev/null || git push --set-upstream origin main

# 4. Включить GitHub Pages через Actions
echo ""
echo "▶ Шаг 3: Включаем GitHub Pages..."
gh api \
  --method POST \
  -H "Accept: application/vnd.github+json" \
  "/repos/$GH_USER/tutu-trip-calculator/pages" \
  -f build_type=workflow \
  2>/dev/null || \
gh api \
  --method PUT \
  -H "Accept: application/vnd.github+json" \
  "/repos/$GH_USER/tutu-trip-calculator/pages" \
  -f build_type=workflow \
  2>/dev/null || true

echo ""
echo "======================================"
echo "✅ Готово! Через 1-2 минуты сайт будет доступен:"
echo ""
echo "   https://$GH_USER.github.io/tutu-trip-calculator/"
echo ""
echo "Следить за деплоем:"
echo "   https://github.com/$GH_USER/tutu-trip-calculator/actions"
echo "======================================"
