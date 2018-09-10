#! /bin/sh

# First, stash index and work dir, keeping only the
# to-be-committed changes in the working directory.
old_stash=$(git rev-parse -q --verify refs/stash)
git stash -q --keep-index --include-untracked
new_stash=$(git rev-parse -q --verify refs/stash)

# If there were no changes (e.g., `--amend` or `--allow-empty`)
# then nothing was stashed, and we should skip everything,
# including the tests themselves.  (Presumably the tests passed
# on the previous commit, so there is no need to re-run them.)
if [ "$old_stash" = "$new_stash" ]; then
    echo "pre-commit script: no changes to test"
    sleep 1 # XXX hack, editor may erase message
    exit 0
fi

# Run tests
make $1
status=$?

# Restore changes
git reset --hard -q && git stash apply --index -q && git stash drop -q

# Exit with status from test-run: nonzero prevents commit
exit $status
