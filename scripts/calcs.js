var Age;
var RetAge;
var ProTerm;
var YearsTo;
var YearsAfter;
var RateBefore;
var RateAfter;
var B1 = 0.0;
var B2 = 0.0;
var PvIncome;
var PvCapital;
var FvIncome;
var FvCapital;
var Inflation = 0.06;
var RR1;
var RR2;
var CapitalNeeded;
var CapitalAvailable;
var CurrentDebit;
var Increase;
var RRincrease;
var Sfall;
var Status;
var CapShortfall;
var LevelPremium;
var EscPremium;
var RRE;
var Count1 = 0;
var Count2 = 0;
var PV1;
var PMT1;
var Valid;
var PVCAP;

function GetDetails()
{
    Age = parseFloat(document.getElementById("Fage").value);
    RetAge = parseFloat(document.getElementById("Frage").value);
    ProTerm = parseFloat(document.getElementById("Fprage").value);
    YearsTo = parseFloat(RetAge - Age);
    YearsAfter = parseFloat(ProTerm - RetAge);

    document.getElementById("Yto").innerHTML = YearsTo;
    document.getElementById("Yaf").innerHTML = YearsAfter;

    document.getElementById("YrMsg").style.display = 'block';

    

}

function T() {

    alert("works");
}

function ValidateR()
{
    if ((Age>RetAge)|| (RetAge>ProTerm) || (Age==0))  {

        Valid = false;
        document.getElementById("ErrorM").style.display = 'block';
        
    }
    else {
        Valid = true;
        document.getElementById("ErrorM").style.display = 'none';
        Show('P1');

    }



}


function GetRates() {

    RateBefore = parseFloat(document.getElementById("Gbefore").value);
    RateAfter = parseFloat(document.getElementById("GbeAfter").value);


    B1 = SetBarper(RateBefore);
    B2 = SetBarper(RateAfter);
    

    document.getElementById("bar1").style.width = B1;
    document.getElementById("bar2").style.width = B2;
    
   
    RR1 = parseFloat((RateBefore - Inflation) / (1 + Inflation)).toFixed(4);
    RR2 = parseFloat((RateAfter - Inflation) / (1 + Inflation)).toFixed(4);

 
    

}

function SetBarper(x) {

    var B = "test";
    

    switch (x) {
        case 0.055:
            B = "20%";
            break;
        case 0.07:
            B = "40%";
            break;
        case 0.09:
            B = "60%";
            break;
        case 0.11:
            B = "80%";
            break;
        case 0.125:
            B = "100%";
            break;
        default:
           

    }
    

    return B;
}

function SetpBar(per,Msg)
{
    document.getElementById("Pbar").style.width = per;
    document.getElementById("pMsg").innerHTML = Msg;


}


function GetNeed()
{

    PvIncome = parseFloat(document.getElementById("MonthAmnt").value);
    PvCapital = parseFloat(document.getElementById("LumpAmnt").value);

    if (isNaN(PvIncome)) {

        PvIncome = 0;

    }

    if (isNaN(PvCapital)) {

        PvCapital = 0;

    }

    FvIncome = FV(Inflation, YearsTo, 0, PvIncome, 0) * -1;
    FvCapital = FV(Inflation, YearsTo, 0, PvCapital, 0) * -1;

   

    document.getElementById("Me1").style.display = 'block';
    document.getElementById("Me2").style.display = 'block';
   
    document.getElementById("FVmonth").innerHTML = PrintNice(FvIncome);
    document.getElementById("FVcap").innerHTML = PrintNice(FvCapital);


    CapitalNeeded = CapitalNeeded2(FvIncome, FvCapital);

    PVCAP = parseFloat(PV(Inflation, YearsTo, 0, CapitalNeeded, 0)) * -1;
 

    document.getElementById("CapNeeded").innerHTML = PrintNice(CapitalNeeded);
    document.getElementById("CapNeededPV").innerHTML = PrintNice(PVCAP);

}

function GetAvailable()
{
   PV1 = parseFloat(document.getElementById("CapLump").value);
   PMT1 = parseFloat(document.getElementById("CapMonth").value);

   if (isNaN(PV1)) {

       PV1 = 0;

   }

   if (isNaN(PMT1)) {

      PMT1 = 0;

   }

    Increase = parseFloat(document.getElementById("Increase1").value);
   

    RRincrease = parseFloat((RateBefore - Increase) / (1 + Increase)).toFixed(4);

    

    CapitalAvailable = parseFloat(CapitalAvailable2(PV1, PMT1));

   

   
    document.getElementById("CapAvailabe").innerHTML = PrintNice(CapitalAvailable);
}

function GetFall()
{
    Sfall = parseFloat(CapitalAvailable - CapitalNeeded);
    

    if (Sfall<0) {

        Status = false;

       

        document.getElementById("P5a").style.display = 'block';
    }
    else {
        status = true;
        document.getElementById("P5b").style.display = 'block';
    }

    document.getElementById("Req1").innerHTML = PrintNice(CapitalNeeded);
    document.getElementById("Av1").innerHTML = PrintNice(CapitalAvailable);
    document.getElementById("Dif1").innerHTML = PrintNice(Sfall);

    DoBars();

    var delay = 4000;


    setTimeout(function () {

        if (status) {

            document.getElementById("Surpl").style.display = 'block';
        }
        else {
            document.getElementById("ShortF").style.display = 'block';
        }
        
    }, delay);

   

    

}

function DoBars() {

    var Available;
    var Required;
    var Difference;
    var SA;
    var SR;
    var SD;

    if (status) {

        Available = 100;
        Difference = 0;
        Required = ((CapitalNeeded / CapitalAvailable) * 100).toFixed(0);
       
        
    }
    else {

        Required = 100;
        Available = ((CapitalAvailable / CapitalNeeded) * 100).toFixed(0);
       
        Difference = (parseFloat(100 - Available));
       
    }

    SA = Available + "%";
    SR = Required + "%";
    SD = Difference + "%";

   

    var delay = 1000;
    var delay1 = 2000;
    var delay2 = 3000;


    

    setTimeout(function () {
        document.getElementById("B4").style.width = SA;
        
    }, delay);

    setTimeout(function () {
        ;
        document.getElementById("B5").style.width = SR;
        
    }, delay1);

    setTimeout(function () {
       
        document.getElementById("B6").style.width = SD;
    }, delay2);


    



}

function CapitalNeeded2(Sal, Lump) {

    //Calculate Income Requirement

    var Pv1;
 
    var PvTotal;

    Pv1 = PV((RR2/12), (YearsAfter*12), Sal, 0, 1) * -1;
   

    PvTotal = Pv1 + Lump;

    return PvTotal 
    



}

function CapitalAvailable2(PV1,PMT1)
{
    var Total;

    var LumpFV

    LumpFV = FV(RateBefore, YearsTo, 0, PV1, 0) * -1;
    


    //CALC CONTRIBUTIONS

    var cPV;

    cPV = parseFloat(PV((RRincrease / 12), (YearsTo * 12), PMT1, 0, 1) * -1);
   
    var cFV;
    
    //die ding bitch met my

    //cFV = parseFloat(FV((RateBefore/12), (YearsTo*12), 0, cPV, 0) * -1);
    
    cFV = FV(RateBefore,YearsTo,0,cPV,0)*-1;
   


    Total = parseFloat((LumpFV + cFV)).toFixed(2);
    
    return Total;


}

function CalcShorfall() {

    RRE = (parseFloat((RateBefore - 0.10) / (1.10))).toFixed(4);
   

    CapShortfall = parseFloat(PV(RateBefore, YearsTo, 0, Sfall, 0));
    
    LevelPremium = parseFloat(pmt((RateBefore / 12), (YearsTo * 12), 0, Sfall, 1));
    
    EscPremium = parseFloat(pmt((RRE / 12), (YearsTo * 12), CapShortfall, 0, 1)) * -1;
   
    
    document.getElementById("SLUMP").innerHTML = PrintNice(CapShortfall);
    document.getElementById("SLEVEL").innerHTML = PrintNice(LevelPremium);
    document.getElementById("SESC").innerHTML = PrintNice(EscPremium);

    var delay = 1000;
    var delay1 = 2000;
    var delay2 = 3000;



    setTimeout(function () {


            document.getElementById("L1").style.display = 'block';
       
    }, delay);

    setTimeout(function () {


        document.getElementById("L2").style.display = 'block';

    }, delay1);

    setTimeout(function () {


        document.getElementById("L3").style.display = 'block';

    }, delay2);
    

    
}

function NewDate(x) {
    
    x = parseFloat(x);


    var Total = parseFloat(x + RetAge);
    
    RetAge = Total;
    

    document.getElementById("RA").innerHTML = RetAge;
    

}

function NewBeforeP() {


    switch (RateBefore) {
        case 0.055:
            Count1=1;
            break;
        case 0.07:
            Count1=2;
            break;
        case 0.09:
            Count1=3;
            break;
        case 0.11:
            Count1=4;
            break;
        case 0.125:
            Count1=5;
            break;
        default:
    }

   
    Count1 = Count1 + 1;

    switch (Count1) {
        case 1:
            RateBefore = 0.055;
            break;
        case 2:
            RateBefore = 0.07;
            break;
        case 3:
            RateBefore = 0.09;
            break;
        case 4:
            RateBefore = 0.11;
            break;
        case 5:
            RateBefore = 0.125;
            break;
        default:

    }

    var T = parseFloat(RateBefore * 100).toFixed(1);
    var Total = T + "%";

    document.getElementById("RB").innerHTML = Total;


}

function NewBeforeM() {


    switch (RateBefore) {
        case 0.055:
            Count1 = 1;
            break;
        case 0.07:
            Count1 = 2;
            break;
        case 0.09:
            Count1 = 3;
            break;
        case 0.11:
            Count1 = 4;
            break;
        case 0.125:
            Count1 = 5;
            break;
        default:
    }


    Count1 = Count1 - 1;

    switch (Count1) {
        case 1:
            RateBefore = 0.055;
            break;
        case 2:
            RateBefore = 0.07;
            break;
        case 3:
            RateBefore = 0.09;
            break;
        case 4:
            RateBefore = 0.11;
            break;
        case 5:
            RateBefore = 0.125;
            break;
        default:

    }

    var T = parseFloat(RateBefore * 100).toFixed(1);
    var Total = T + "%";

    document.getElementById("RB").innerHTML = Total;


}

function NewAfterP() {


    switch (RateAfter) {
        case 0.055:
            Count2 = 1;
            break;
        case 0.07:
            Count2 = 2;
            break;
        case 0.09:
            Count2 = 3;
            break;
        case 0.11:
            Count2 = 4;
            break;
        case 0.125:
            Count2 = 5;
            break;
        default:
    }


    Count2 = Count2 + 1;

    switch (Count2) {
        case 1:
            RateAfter = 0.055;
            break;
        case 2:
            RateAfter = 0.07;
            break;
        case 3:
            RateAfter = 0.09;
            break;
        case 4:
            RateAfter = 0.11;
            break;
        case 5:
            RateAfter = 0.125;
            break;
        default:

    }

    var T = parseFloat(RateAfter * 100).toFixed(1);
    var Total = T + "%";

    document.getElementById("RBA").innerHTML = Total;


}

function NewAfterM() {


    switch (RateAfter) {
        case 0.055:
            Count2 = 1;
            break;
        case 0.07:
            Count2 = 2;
            break;
        case 0.09:
            Count2 = 3;
            break;
        case 0.11:
            Count2 = 4;
            break;
        case 0.125:
            Count2 = 5;
            break;
        default:
    }


    Count2 = Count2 - 1;

    switch (Count2) {
        case 1:
            RateAfter = 0.055;
            break;
        case 2:
            RateAfter = 0.07;
            break;
        case 3:
            RateAfter = 0.09;
            break;
        case 4:
            RateAfter = 0.11;
            break;
        case 5:
            RateAfter = 0.125;
            break;
        default:

    }

    var T = parseFloat(RateAfter * 100).toFixed(1);
    var Total = T + "%";

    document.getElementById("RBA").innerHTML = Total;


}

function NewIncomeP()
{
    PvIncome = PvIncome + 1000;

    document.getElementById("RI").innerHTML = PrintNice(PvIncome);
}

function NewCapP() {
    PvCapital = PvCapital + 1000;

    document.getElementById("RC").innerHTML = PrintNice(PvCapital);
}

function NewIncomeM() {
    PvIncome = PvIncome -1000;

    document.getElementById("RI").innerHTML = PrintNice(PvIncome);
}

function NewCapM() {
    PvCapital = PvCapital -1000;

    document.getElementById("RC").innerHTML = PrintNice(PvCapital);
}

function DispOld() {


    document.getElementById("RA").innerHTML = RetAge;

    var T = parseFloat(RateBefore * 100).toFixed(1);
    var Total = T + "%";

    document.getElementById("RB").innerHTML = Total;


    var D = parseFloat(RateAfter * 100).toFixed(1);
    var Total2 = D + "%";

    document.getElementById("RBA").innerHTML = Total2;

    document.getElementById("RI").innerHTML = PrintNice(PvIncome);

    document.getElementById("RC").innerHTML = PrintNice(PvCapital);



}

function CalcNew() {

    YearsTo = parseFloat(RetAge - Age);
    
    YearsAfter = parseFloat(ProTerm - RetAge);

    RRE = (parseFloat((RateBefore - 0.10) / (1.10))).toFixed(4);
    
    FvIncome = FV(Inflation, YearsTo, 0, PvIncome, 0) * -1;
    FvCapital = FV(Inflation, YearsTo, 0, PvCapital, 0) * -1;

   

    CapitalNeeded = CapitalNeeded2(FvIncome, FvCapital);

   

    CapitalAvailable = parseFloat(CapitalAvailable2(PV1, PMT1));

  

    Sfall = parseFloat(CapitalAvailable - CapitalNeeded);
   

    




    document.getElementById("Req2").innerHTML = PrintNice(CapitalNeeded);
    document.getElementById("Av2").innerHTML = PrintNice(CapitalAvailable);
    document.getElementById("Dif2").innerHTML = PrintNice(Sfall);

    if (Sfall>0) {

        document.getElementById("LastF").style.display = 'none';
    }

    if (Sfall < 0) {

      
        CapShortfall = parseFloat(PV(RateBefore, YearsTo, 0, Sfall, 0));

        

        LevelPremium = parseFloat(pmt((RateBefore / 12), (YearsTo * 12), 0, Sfall, 1));

        

        EscPremium = parseFloat(pmt((RRE / 12), (YearsTo * 12), CapShortfall, 0, 1)) * -1;

       
        document.getElementById("SLUMP2").innerHTML = PrintNice(CapShortfall);
        document.getElementById("SLEVEL2").innerHTML = PrintNice(LevelPremium);
        document.getElementById("SESC2").innerHTML = PrintNice(EscPremium);

        document.getElementById("LastF").style.display = 'block';


    }


    



}

function ShowHide(S, H) {


    document.getElementById(S).style.display = 'block';
    document.getElementById(H).style.display = 'none';

    GoTo(S);
}


function Hide(H) {
   
    document.getElementById(H).style.display = 'none';
}

function Show(S) {


    document.getElementById(S).style.display = 'block';
    GoTo(S);
    
}


function FV(rate, nper, pmt, pv, type) {
    var pow = Math.pow(1 + rate, nper),
       fv;
    if (rate) {
        fv = (pmt * (1 + rate * type) * (1 - pow) / rate) - pv * pow;
    } else {
        fv = -1 * (pv + pmt * nper);
    }
    return fv.toFixed(2);
}

function PV(rate, periods, payment, future, type) {
    // Initialize type
    var type = (typeof type === 'undefined') ? 0 : type;

    // Evaluate rate and periods (TODO: replace with secure expression evaluator)
    rate = eval(rate);
    periods = eval(periods);

    // Return present value
    if (rate === 0) {
        return -payment * periods - future;
    } else {
        return (((1 - Math.pow(1 + rate, periods)) / rate) * payment * (1 + rate * type) - future) / Math.pow(1 + rate, periods);
    }
}

function pmt(rate_per_period, number_of_payments, present_value, future_value, type) {
    if (rate_per_period != 0.0) {
        // Interest rate exists
        var q = Math.pow(1 + rate_per_period, number_of_payments);
        return -(rate_per_period * (future_value + (q * present_value))) / ((-1 + q) * (1 + rate_per_period * (type)));

    } else if (number_of_payments != 0.0) {
        // No interest rate, but number of payments exists
        return -(future_value + present_value) / number_of_payments;
    }

    return 0;
}

function PrintNice(x)
{
   x= x.toFixed(2);
   return "R "+ x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function GoTo(x) {
    document.getElementById(x).focus();
    
}

function SetPDF() {

    document.getElementById("pAge").innerHTML = Age;
    document.getElementById("pRAge").innerHTML = RetAge;
    document.getElementById("pPAge").innerHTML = ProTerm;
    document.getElementById("pBefore").innerHTML = (RateBefore*100)+"%";
    document.getElementById("pAfter").innerHTML = (RateAfter*100)+"%";
    document.getElementById("pInf").innerHTML = (Inflation*100)+"%";
    document.getElementById("pLump").innerHTML = PrintNice(PV1);
    document.getElementById("pMonth").innerHTML = PrintNice(PMT1);
    document.getElementById("pInc").innerHTML = (Increase*100)+"%";
    document.getElementById("pRmonth").innerHTML = PrintNice(PvIncome);
    document.getElementById("pRlump").innerHTML = PrintNice(PvCapital);

    document.getElementById("pRpv").innerHTML = PrintNice(PVCAP);
    document.getElementById("pRfv").innerHTML = PrintNice(CapitalNeeded);

    document.getElementById("pApv").innerHTML = PrintNice(CapitalAvailable);
    document.getElementById("Tca").innerHTML = PrintNice(CapitalAvailable);
    document.getElementById("Tcr").innerHTML = PrintNice(CapitalNeeded);
    document.getElementById("Tdif").innerHTML = PrintNice(Sfall);
    document.getElementById("pAdlump").innerHTML = PrintNice(CapShortfall);
    document.getElementById("pAdM").innerHTML = PrintNice(LevelPremium);
    document.getElementById("pAdMi").innerHTML = PrintNice(EscPremium);










}

function ChangeMessage(x){
    
    
    var M1 = "Your current age is how old you are today.  </br> Your retirement age is when you plan to retire, this is usually between 55 and 65. </br> </br>  The only two certainties in life are death & taxes: your death age is thus how long you expect to live. We usually use 100 as a default for planning purposes. ";
    var M2 = "Risk & Return go Hand-in-Hand. The more risk you take on, the higher the potential return you expect to achieve over the long term. Investors usually invest more aggressively before retirement, and more conservatively after retirement when they may not be able to afford unnecessary risk in their portfolios. ";
    var M3 = "PV stands for Present Value, whereas FV stands for Future value. In the future a bread may cost R100 [FV], the same bread in today’s rand [PV] could cost R10.";
    var M4 = "A monthly recurring investment may have a great impact in your retirement position.  Only include investments that are earmarked for Retirement purposes. ";
    switch (x) {
        case 1:
            document.getElementById("MM12").innerHTML = M1;
            break;
        case 2:
            document.getElementById("MM12").innerHTML = M2;
            break;
        case 3:
            document.getElementById("MM12").innerHTML = M3;
            break;
        case 4:
            document.getElementById("MM12").innerHTML = M4;
            break;
        case 5:
            document.getElementById("MM12").innerHTML = "N/A";
            break;
        default:
            break;

    }


    
    
}





////http://stackoverflow.com/questions/1780645/how-to-calculate-future-value-fv-using-javascript

//http://www.mohaniyer.com/old/js.htm#pv

