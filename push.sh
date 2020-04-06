echo `git status` | grep -q "Untracked files"
if [ $? -eq 0 ];then
    git add .
    git commit -m "Update Something"
    git push
fi