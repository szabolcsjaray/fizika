function ExprTree() {
    this.root=new BinTree(null);
}
const OPERATORS = "+-*/^";

function getOperatorOrder(sign) {
    return OPERATORS.indexOf(sign);
}

function findSmallerProiorityOperatorUp(node, parent, nextOperator) {
    if (parent==null) {
        return node;
    }
    if (getOperatorOrder(parent.node)<getOperatorOrder(nextOperator)) {
        return node;
    }
    return findSmallerProiorityOperatorUp(node.parent, node.parent.parent, nextOperator);
}

function calculateNode(node) {
    if (node.leaf) {

        return parseFloat(node.node);
    } else {
        let leftVal = calculateNode(node.left);
        let rightVal = calculateNode(node.right);
        switch (node.node[0]) {
            case '+':
                return leftVal + rightVal;
            case '-':
                return leftVal - rightVal;
            case '*':
                return leftVal * rightVal;
            case '/':
                return leftVal / rightVal;
            case '^':
                return Math.pow(leftVal, rightVal);
        }
    }
}

ExprTree.prototype.calculate = function() {
    return calculateNode(this.root);
};

function readNextItem( parts, i ) {
    if (parts[i]=='(') {
        let innerExpressionParts = [];
        let openClosures = 1;
        i++;
        while(i<parts.length && !(openClosures==1 && parts[i]==')')) {
            innerExpressionParts.push(parts[i]);
            if (parts[i]=='(') {
                openClosures++;
            } else if (parts[i]==')') {
                openClosures--;
            }
            i++;
        }
        if (openClosures!=1 || i>=parts.length) {
            console.log("Wrong expression: " + exprStr + ", closures are wrong.");
        }
        let innerExprStr = innerExpressionParts.join(' ');
        let innerExprTree = new ExprTree();
        innerExprTree.createExprTree(innerExprStr);
        // console.log("innerExpr str:" + innerExprStr + " = " + innerExprTree.calculate());
        return { nextItem: innerExprTree.root, nextI: (i+1)};
    } else {
        let valueNode = new BinTree(parts[i]);
        valueNode.operator = false;
        return { nextItem: valueNode, nextI : (i+1)};
    }
}

ExprTree.prototype.createExprTree = function(exprStr) {
    this.exprStr = exprStr;

    let parts = exprStr.split(' ');
    if (parts.length<1) return;

    let nextInfo = readNextItem(parts, 0);

    this.root = nextInfo.nextItem;
    let i = nextInfo.nextI;
    let actNode=this.root;

    for( ;i<parts.length;) {
        let nextOperator = parts[i];
        if (getOperatorOrder(nextOperator)<0) {
            console.log("Wrong expression: " + exprStr + ". Not operator:" + nextOperator);
            return;
        }
        i++;
        if (i>=parts.length) {
            console.log("Wrong expression: " + exprStr + ". Missing item after operator:" + nextOperator);
            return;
        }
        let nextInfo = readNextItem(parts, i);
        let nextItemNode = nextInfo.nextItem;
        i = nextInfo.nextI;

        let where = findSmallerProiorityOperatorUp(actNode, actNode.parent, nextOperator);
        let newOperatorNode = new BinTree(nextOperator);
        let whereParent = where.parent;
        if (whereParent!=null) {
            newOperatorNode.setParentRightChild(whereParent);
        } else {
            this.root = newOperatorNode;
        }
        newOperatorNode.setLeft(where);
        newOperatorNode.setRight(nextItemNode);
        actNode = nextItemNode;

    }
    console.log("Ready.");
};

ExprTree.prototype.toStr=function() {
    this.root.nullParentLinks();
    let str = JSON.stringify(this);
    this.root.addParentLinks();
    return str;
};

function strPart(node) {
    if (node.leaf) {
        return node.node;
    }
    let leftStr = strPart(node.left);
    if (!node.left.leaf && getOperatorOrder(node.left.node)<getOperatorOrder(node.node)) {
        leftStr = "( "+leftStr +" )";
    }
    let rightStr = strPart(node.right);
    if (!node.right.leaf && getOperatorOrder(node.right.node)<getOperatorOrder(node.node)) {
        rightStr = "( "+rightStr +" )";
    }
    return leftStr +" " + node.node + " " + rightStr;
}

ExprTree.prototype.readable = function() {
    let str = "";
    str = strPart(this.root);
    return str;
};