function innerRoots(branches, rootArray, index, mode, detectedID) {

    let firstStep = false;

    if (rootArray == null) {

        for (let i = 0; i < branches.length; i++) {

            if (rootArray == null) {
                rootArray = [];
                firstStep = true;
            }

            if (branches[i].parentID == null && firstStep) {
                rootArray[index] = [];
                rootArray[index][0] = branches[i].id;
                rootArray[index][1] = [];
                index++;
                detectedID.push(branches[i].id);
            }

        }
        return innerRoots(branches, rootArray, index, mode, detectedID);
    }
    else {
        for (let j = 0; j < index; j++) {

            let k = 0;
            let branchHasChild = false;
            let innerIndex = 1;

            for (let i = 0; i < branches.length; i++) {
                if (rootArray[j][0] !== null) {
                    if (rootArray[j][0] === branches[i].parentID && !mode) {
                        k++;
                        branchHasChild = true;
                        rootArray[j][k] = [branches[i].id, []];
                        detectedID.push(branches[i].id);
                    }
                }

                if (rootArray[j] === branches[i].parentID && mode) {
                    k++;
                    branchHasChild = true;
                    rootArray[j + innerIndex] = [branches[i].id, []];
                    detectedID.push(branches[i].id);
                }

                if (branchHasChild) {

                    detectedID = Array.from(new Set(detectedID));
                    for (let s = 0; s < branches.length; s++) {

                        if (rootArray[j] !== null && mode) {
                            if (rootArray[j + innerIndex][0] === branches[s].parentID && !isLooped(detectedID, branches[s].id)) {
                                rootArray[j + innerIndex] = innerRoots(branches, rootArray[j + innerIndex], 1, true, detectedID);
                            }
                        } else if (rootArray[j][k][0] !== null && !mode) {
                            if (rootArray[j][k][0] === branches[s].parentID  && !isLooped(detectedID, branches[s].id)) {
                                rootArray[j][k] = innerRoots(branches, rootArray[j][k], 1, true, detectedID);
                            }

                        }
                    }
                    innerIndex++;
                    branchHasChild = false;
                }
            }
        }
    }
    return rootArray;
}

function treeViewer(tree, index, level) {
    for (let i = 0; i < index; i++) {
        if (tree[i].length === undefined) {

            console.log(emptySpace(level)+tree[i]);
            level++;
        }
        else {
            treeViewer(tree[i], tree[i].length, level);
        }
    }
}

function isLooped(oldVer, newVer){
    if(oldVer.includes(newVer)){
        throw new Error("tree is looped");
    }else{
        return false;
    }
}

function emptySpace(level){
    let space = " ";
    for(let i = 0; i < level; i++){
        space += ".";
    }
    return space;
}

let branches = require('./package');
branches = branches.data;
console.log(branches);
try{
    let x = innerRoots(branches, null, 0, false, []);
    console.log("/////////////////");
    treeViewer(x, x.length, 0);
    console.log("/////////////////");
}
catch (e) {
    console.log(e);
}



