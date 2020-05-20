function testExpr(testStr, expected,  c) {
    let et = new ExprTree();
    let exprStr = et.createExprTree(testStr);
    let actual = et.calculate();
    c.write(et.exprStr + " = " + actual  + ", expected: " + expected + " -- " +(actual==expected ? "PASSED" : "FAILED"));

    //c.write(et.toStr());
    c.write(et.readable());
    c.write("----------------------------------------------");


}

function init() {
    let c = new ConsoleDiv("console");
    c.write("ExpTree tesztek.");
    testExpr("1 + 2", 3, c);

    testExpr("3 + 2 * 3", 9, c);
    testExpr("3 + 2 * 3 + 1", 10, c);
    testExpr("3 * 2 - 2 ^ 3 * 2 - 7 * 2", -24, c);

    testExpr("2 * ( 1 + 2 )", 6, c );
    testExpr("2 * ( 1 + 2 ) - 10", -4, c );
    testExpr("1 + ( ( 2 + 3 ) * ( 4 + 5 ) + 6 ) * 7", 358, c);
    testExpr("( ( 2 + 1 ) * 2 ) ^ 2 + 6", 42, c);
    testExpr("( 3 + 7 ) * 8 - 2 ^ 3", 72, c);

    testExpr("3 + 5 - 3 + 2 - 1", 6, c);
}