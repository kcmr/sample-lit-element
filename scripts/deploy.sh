#!/bin/sh
if [ "${CIRCLE_BRANCH}" == "${SOURCE_BRANCH}" ]; then
  git config --global user.email "${GH_EMAIL}"
  git config --global user.name "${GH_NAME}"

  git clone "${CIRCLE_REPOSITORY_URL}" out

  cd out
  git checkout "${TARGET_BRANCH}" || git checkout --orphan "${TARGET_BRANCH}"
  git rm -rf .
  cd ..

  npm run build

  cp -a build/es6-bundled/demo/. out/.

  cd out

  git add -A
  git commit -m '[ci skip] deploy to Github Pages' --allow-empty
  git push --force origin "${TARGET_BRANCH}"
fi
