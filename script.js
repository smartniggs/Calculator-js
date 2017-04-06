"use strict";
$(function() {


    var txtStr = "";
    //incase of del
    var txt_All = "";
    var str = ""
    var symBool = false;
    var point = false;
    var sym = "";
    var totalClicked = false;
    var b_left = 0;
    var b_right = 0;
    var b_leftBool = false;
    var totalT = 0;

    window.addEventListener("keypress", checkKeyPresed, false);
    
    function checkKeyPresed(e) {
        var ch = '';
        var key = e.keyCode;

        switch (key) {

            // case 120:
            //     sym='*';
            //     symB();  nt rily needed
            case 42:
                sym='*';
                symB();
                // $(#times)
                break;
            case 43:
                sym='+';
                symB();
                break;
            case 45:
                sym='-';
                symB();
                break;
            case 47:
                sym='/'
                symB();
                break;
            case 61: 
                equals();
                updateText_AreaTotal();
                break;
            case 46:
                pointT();
                break;
            case 40:
                bLeft();
                break;
            case 41:
                bRight();
                break;
            case 33:
                equals();
                factorial(totalT);
                validate();
                break;
            
        }

    } //end func

    window.addEventListener("keydown", _keyDown, false);

    function _keyDown(e) {
        var key = e.keyCode;

        switch (key) {
            case 8: case 127:
                dell();
                break;
            case 13://enter key
                equals();
                updateText_AreaTotal();
                break;
                case 27:
                 resetAll();
                 break;

        }
    }

    function toDeg(angle) {
        return angle * (180 / Math.PI);
    } //end func

    function toRad(angle) {
        return angle * (Math.PI / 180);
    } //end func


    $('.no').click(function(e) {
        var no_id = e.currentTarget.id;
        var str;
        switch (no_id) {
            case ("nine"):
                str = '9';
                break;
            case ("eight"):
                str = '8';
                break;
            case ("seven"):
                str = '7';
                break;
            case ("six"):
                str = '6';
                break;
            case ("five"):
                str = '5';
                break;
            case ("four"):
                str = '4';
                break;
            case ("three"):
                str = '3';
                break;
            case ("two"):
                str = '2';
                break;
            case ("one"):
                str = '1';
                break;
            case ("zero"):
                str = '0'
                break;
        }
        //        alert(txt_All);
        no(str);
    });

    function no(st) {
        if (totalClicked === true) {
            totalClicked = false;
            txt_All = "";
            b_left = 0;
            b_right = 0
        }

        symBool = false;
        txt_All += st;

        updateText_Area();
    } //end func

    $('.sym').click(function(e) {
        var sym_id = e.currentTarget.id;

        switch (sym_id) {
            case ("plus"):
                sym = '+';
                break;
            case ("minus"):
                sym = '-';
                break;
            case ("times"):
                sym = '*';
                break;
            case ("divide"):
                sym = '/';
                break;
        }
        symB();
    }); //end func

    function symB() {
        if (symBool === true)
            return;
        symBool = true;
        if (totalClicked === true) {
            totalClicked = false;
        }
        if (txt_All != null && txt_All.length === 0)
            return;
        point = false;

        txt_All += sym;
        updateText_Area();


    } //end func

    function updateText_Area() {

        $('#textArea').text(txt_All);
    } //end func

    function updateText_AreaStr(strr) {

        $('#textArea').text(strr);
    } //end func

    function updateText_AreaTotal() {

        
        if (isNaN(totalT) || totalT == "Infinity" || totalT == null || totalT.length == 0){
            txt_All = "";
            $('#textArea').text("E");
        }
        else {
            txt_All = totalT;
            $('#textArea').text(totalT);
        }
    } //end func

    $('#point').click(function(e) {
    pointT();
    });

    function pointT(){
        if (totalClicked === true) {
            totalClicked = false;
            txt_All = "";
            b_left = 0;
            b_right = 0
        } //end func


        if (point === true)
            return;
        point = true;
        if (txt_All.length === 0) {
            str += '0.';
        } else {
            str = '.';
        }

        txt_All += str;

        updateText_Area();



    } //end func


    $('#equals').click(function() {
        // updateText_AreaTotal(equals());
        equals();
        updateText_AreaTotal();
        //        symBool=true;
    }); //end func

    function equals() {
        if (b_left === b_right) {
            //!!!!!!!!!!!!!!!!!try   catch
            try {
                totalT = eval(txt_All);
            } catch (error) {
                // alert("Err");
                return;
            }


            if (isNaN(totalT) || totalT == "Infinity") {

                //    updateText_AreaStr('E');
                return;
                // totalT="E";
                // txt_All="";
                // alert(totalT);
                // totalClicked=true;
                // symB=false;  //cos we don't want any sym/dot following htis
                // point=false;
            } else {
                totalClicked = true;


                //INSERT HERE.............!!!!!!

                //STOP ABOVE!!!!..

                // return total;
            }

        }

    } //end func


    $('#b_left').click(function(e) {
        bLeft();
    });
    function bLeft() {  
        if (totalClicked === true) {
            totalClicked = false;
            txt_All = "";
            b_left = 0;
            b_right = 0;
        }

        txt_All += '(';
        b_left++;
        b_leftBool = true;
        updateText_Area();
    } //end func

    $('#b_right').click(function(e) {
        bRight();
    });
    function bRight() {
        if (totalClicked === true || b_leftBool === false) {
            return; //cos tis d ist str
        }
        b_right++;
        b_leftBool = b_left === b_right ? false : true; //only exec when it's true..
        txt_All += ')';
        updateText_Area();
    } //end func

    $('.power').click(function(e) {
        var _id = e.currentTarget.id;
        // var result;
        equals();
        // alert(equ)
        switch (_id) {
            case 'sq':
                totalT = Math.pow(parseFloat(totalT), 2);
                break;
            case 'cube':
                totalT = Math.pow(parseFloat(totalT), 3);
                break;
            case 'sq_root':
                totalT = Math.sqrt(totalT);
                break;
            case 'cube_root':
                totalT = Math.cbrt(totalT);
                break;


        }
        validate();

    }); //end func

    $('.trig').click(function(e) {
        var _id = e.currentTarget.id;
        equals();
        switch (_id) {
            case 'sin':
                totalT = Math.sin(parseFloat(toRad(totalT)));
                break;
            case 'cos':
                totalT = Math.cos(parseFloat(toRad(totalT)));
                break;
            case 'tan':
                totalT = Math.tan(parseFloat(toRad(totalT)));
                break;
            case 'asin':
                totalT = toDeg(Math.asin(parseFloat(totalT)));
                break;
            case 'acos':
                totalT = (toDeg(Math.acos(parseFloat(totalT))));
                break;
            case 'atan':
                totalT = (toDeg(Math.atan(parseFloat(totalT))));
                break;
        }
        validate();
    }); //end func

    function validate() {
        updateText_AreaTotal();
    } //end func

    function factorial(no) {
        var j = 1
        var ans = 1;
        while (j <= no) {
            ans *= j;
            j++
        }
        totalT = ans;
    } //end func

    $('#fac').click(function(e) {
        equals();
        factorial(totalT);
        validate();
    }); //end func    

    $('#del').click(function(e) {
        dell();
    });
    function dell() {
        
    
        // alert(txt_All);
        if (txt_All == null)
            return;
        if (txt_All.length === 0)
            return;
        if (txt_All.length === 1) {
            txt_All = "";
            updateText_Area();
            return;
        }
        var st = txt_All[txt_All.length - 1];
        switch (st) {
            case '.':
                point = false;
                break;
            case '+':
            case '-':
            case '*':
                symBool = false;
                break;
            case '(':
                b_left--;
                break;
            case ')':
                b_right--;
                break;
        }
        // alert(typeof(txt_All));
        txt_All = txt_All.toString();
        txt_All = txt_All.substring(0, txt_All.length);




        updateText_Area();


    } //end func

    $('#clr').click(function(e) {
        resetAll();
    }); //end func

    function resetAll() {
        txt_All = "";
        point = false;
        symBool = false;
        updateText_Area();
    }

    $('#per').click(function (e) {
        equals();
        totalT=totalT/100;
        updateText_AreaTotal();
    });

});