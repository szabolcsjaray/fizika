function BinTree(root) {
    this.leaf = true;
    this.node = root;
    this.left = null;
    this.right = null;
    this.parent = null;
}

BinTree.prototype.setLeft = function(object) {
    this.left=object;
    if (object!=null) {
        this.leaf=false;
        object.parent=this;
    }};
BinTree.prototype.setRight = function(object) {
    this.right=object;
    if (object!=null) {
        this.leaf=false;
        object.parent=this;
    }
};
BinTree.prototype.setParentRightChild = function(binTree) {
    if (!(binTree instanceof BinTree)) return;

    this.parent=binTree;
    binTree.setRight(this);
};
BinTree.prototype.setParentLeftChild = function(binTree) {
    if (!(binTree instanceof BinTree)) return;

    this.parent=binTree;
    binTree.setLeft(this);
};
BinTree.prototype.setNode = function(object) {
    this.node=object;
};
BinTree.prototype.nullParentLinks = function() {
    this.parent=null;
    if (this.left!=null) {
        this.left.nullParentLinks();
    }
    if (this.right!=null) {
        this.right.nullParentLinks();
    }
};

BinTree.prototype.addParentLinks = function() {
    if (this.left!=null) {
        this.left.parent = this;
        this.left.addParentLinks();
    }
    if (this.right!=null) {
        this.right.parent = this;
        this.right.addParentLinks();
    }
};