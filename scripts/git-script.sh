#! /bin/sh

# トラッキングされていないファイルも含めてstash 
old_stash=$(git rev-parse -q --verify refs/stash)
git stash -q --keep-index --include-untracked
new_stash=$(git rev-parse -q --verify refs/stash)

# ステージングにファイルがなければ (コミットされるファイルがなければ)
# テストを実行せずにそのまま終了
if [ "$old_stash" = "$new_stash" ]; then
    echo "pre-commit script: no changes to test"
    sleep 1 # ハック: エディタによってはメッセージを表示しないことがあるため
    exit 0
fi

# テストを実行する
make $1
status=$?

# stashの内容をリストア
git reset --hard -q && git stash pop --index -q 

# テストが失敗すればコミットはされない
exit $status
