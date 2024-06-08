class BinaryTreeNode {
    constructor(val, left = null, right = null) {
        this.val = val
        this.left = left
        this.right = right
    }
}
class BinaryTree {
    constructor(root = null) {
        this.root = root
    }
    minDepth() {//length of shortest path from root to a leaf
        if (!this.root) return 0
        function helper(node) {
            if (!node.left && !node.right) return 1
            if (!node.left)  return helper(node.right)+ 1
            if (!node.right) return helper(node.left) + 1
            return Math.min(helper(node.left), helper(node.right)) + 1
        }
        return helper(this.root)
    }
    maxDepth() {
        if (!this.root) return 0
        function helper(node) {
            if (!node.left && !node.right) return 1
            if (!node.left) return helper(node.right)+ 1
            if (!node.right)return helper(node.left) + 1
            return Math.max(helper(node.left), helper(node.right)) + 1
        }
        return helper(this.root)
    }
    maxSum() {//obtain by traveling along a path.Path can start at any node, but can't visit a node more than once
        let result = 0
        function helper(node) {
            if (!node) return 0
            const leftSum = helper(node.left)
            const rightSum = helper(node.right)
            result = Math.max(result, node.val+leftSum+rightSum)
            return Math.max(0, leftSum+node.val, rightSum+node.val)
        }
        helper(this.root)
        return result
    }
    nextLarger(x) {//smallest value (in tree) which is larger than x
        if (!this.root) return null
        
        let Q = [this.root]//queue for BFS
        let ans = null
        while (Q.length) {
            let currentNode = Q.shift()
            let currentVal = currentNode.val

            if ((x < currentVal && currentVal < ans) || (x < currentVal && !ans)) ans = currentVal
            if (currentNode.left ) Q.push(currentNode.left)
            if (currentNode.right) Q.push(currentNode.right)
        }
        return ans
    }
    areCousins(node1,node2){//are cousins?(same level but have different parents)
        if (node1 === this.root || node2 === this.root) return false
        function findLevelAndParent(nodeToFind,currentNode,level = 0,data = { level: 0, parent: null }) {
            if (data.parent) return data
            if (currentNode.left === nodeToFind || currentNode.right === nodeToFind) {
                data.level = level + 1
                data.parent = currentNode
            }
            if (currentNode.left) findLevelAndParent(nodeToFind, currentNode.left, level + 1, data)
            if (currentNode.right)findLevelAndParent(nodeToFind, currentNode.right, level + 1, data)
            return data
        }
        let node1Info = findLevelAndParent(node1, this.root)
        let node2Info = findLevelAndParent(node2, this.root)
        let sameLevel =node1Info && node2Info && node1Info.level === node2Info.level
        let differentParents =node1Info && node2Info && node1Info.parent !== node2Info.parent
        return sameLevel && differentParents
    }
    static serialize(tree) {
        const ans = []
        function traverse(node) {
            if (node) {
                ans.push(node.val)
                traverse(node.left)
                traverse(node.right)
            } 
            else ans.push("#")
        }
        traverse(tree.root)
        return ans.join(" ")
    }
    static deserialize(stringTree) {
        if (!stringTree) return null
        const values = stringTree.split(" ")
        function buildTree() {
            // building a tree starting from the beginning of the array
            if (values.length) {
                const currentVal = values.shift()
                if (currentVal === "#") return null

                // remember to convert values back into numbers
                let currentNode = new BinaryTreeNode(+currentVal)
                currentNode.left = buildTree()
                currentNode.right = buildTree()
                return currentNode
            }
        }
        const root = buildTree()
        return new BinaryTree(root)
    }
    lowestCommonAncestor(node1,node2, currentNode=this.root){//LCA of node1,node2
        if (!currentNode) return null//empty tree
        if (currentNode === node1 || currentNode === node2) return currentNode//root is one of 2 nodes        
        const left = this.lowestCommonAncestor(node1, node2, currentNode.left)//recursively search left sub-tree
        const right = this.lowestCommonAncestor(node1, node2, currentNode.right)// recursively search right sub-tree        
        if (left && right) return currentNode// if neither left nor right is null, currentNode is the ancestor        
        if (left || right) return left || right// if one node is not null, return it        
        if (!left && !right) return null// left and right are both null, return null
    }
}
//     1
//    / \
//   2   3
//  /
// 4
const root =new BinaryTreeNode(
                1,
                new BinaryTreeNode(2,new BinaryTreeNode(4),null),
                new BinaryTreeNode(3))
console.log(new BinaryTree(root).minDepth())//2
console.log(new BinaryTree(root).maxDepth())//3
console.log(new BinaryTree(root).maxSum())//10
console.log(new BinaryTree(root).nextLarger(3))//4
console.log(new BinaryTree(root).areCousins(2,3))//false
console.log(BinaryTree.serialize(new BinaryTree(root)))//'1 2 4 # # # 3 # #'
console.log(BinaryTree.deserialize('1 2 4 # # # 3 # #'))/*  BinaryTree {
                                                                root: BinaryTreeNode {
                                                                    val: 1,
                                                                    left: BinaryTreeNode { val: 2, left: [BinaryTreeNode], right: null },
                                                                    right:BinaryTreeNode { val: 3, left: null, right: null }
                                                                }
                                                            }*/

const node4 = new BinaryTreeNode(4)
const node2 = new BinaryTreeNode(2, node4, null)
const node3 = new BinaryTreeNode(3)
const R = new BinaryTreeNode(1, node2, node3)
const tree = new BinaryTree(R)// Create binary tree
console.log(new BinaryTree(R).lowestCommonAncestor(node2,node3).val)//1
///////////////////////////////////////////////////////////////////////////
class TreeNode {//node for a general tree
    constructor(val, children = []) {
        this.val = val
        this.children = children
    }
}
class Tree {
    constructor(root = null) {
        this.root = root
    }
    sumValues() {//all values
        if (!this.root) return 0
        let total = this.root.val
        function helper(node) {
            for (let child of node.children) {
                total += child.val                
                if (child.children.length > 0) helper(child)//if it has any children,recurse with the child as the root
            }
        }
        helper(this.root)
        return total
    }
    countEvens() {//count even nodes
        if (!this.root) return 0
        let count = this.root.val % 2 === 0 ? 1 : 0
        function countEvensHelper(node) {
            for (let child of node.children) {
                if (child.val % 2 === 0) count++
                if (child.children.length > 0) countEvensHelper(child)
            }
        }
        countEvensHelper(this.root)
        return count
    }
    numGreater(x) {//count nodes > x
        if (!this.root) return 0
        let count = this.root.val > x ? 1 : 0
        function countEvensHelper(node) {
            for (let child of node.children) {
                if (child.val > x) count++
                if (child.children.length > 0) countEvensHelper(child)
            }
        }
        countEvensHelper(this.root)
        return count
    }
}
//       1
//     / | \
//    2  3  4
//       |
//       5
const root1 = new TreeNode(1, [
                            new TreeNode(2, [new TreeNode(5)]),
                            new TreeNode(3),
                            new TreeNode(4)
                        ])
console.log(new Tree(root1).sumValues())//15
console.log(new Tree(root1).countEvens())//2
console.log(new Tree(root1).numGreater(1))//4
///////////////////////////////////////////////////////////////////////////
module.exports = { BinaryTree, BinaryTreeNode,Tree,TreeNode }