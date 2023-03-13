var base_url = 'http://localhost/';
function Success_Alert(MSG) {
    Swal.fire({
        icon: 'success',
        title: MSG,
        showConfirmButton: false,
        timer: 2000
    })
}

function Error_Alert(MSG) {

    Swal.fire({
        icon: 'error',
        title: MSG,
        showConfirmButton: false,
        timer: 2000
    })
}
function Confirmation_Before_Submit()
{
   
            
       
}
function Showloader() {
    $(".loadertap2").show();
    $(".loadertap1").show();
}
function Hideloader() {
    $(".loadertap2").hide();
    $(".loadertap1").hide();
}
function Delete_Record(ID,Client_ID,Function_Name) {

    $.ajax({

        type: 'POST',
        url: Function_Name,
        autoUpload: true,
        dataType: 'json',
        data: {
            Client_ID: Client_ID,
            Delete_ID: ID
        },
        beforeSend: function () {
            Showloader();
        },
        complete: function () {
            Hideloader();
        },
        success: function (data) {
            if (data.Result == "Success") {
                Success_Alert(data.message);
            }
            else {
                Error_Alert(data.message);
            }
        },
        error: function (e1, e2, e3) {

        }
    });
}

function Get_State(Client_ID, ID) {
    $("#" + ID).empty();
    $.ajax({

        type: 'POST',
        url: '/Master/Get_States',
        autoUpload: true,
        dataType: 'json',
        data: { Client_ID: Client_ID },

        beforeSend: function () {
            Showloader();
        },
        complete: function () {
            Hideloader();
        },
        success: function (Accnos) {
            $("#" + ID).append($('<option/>', { Value: 0, text: "--Select State--" }));
            $.each(Accnos, function (i, Accno) {
                $("#" + ID).append('<option value="' + Accno.State_ID + '">' + Accno.State_Name + '</option>');
            });
        },
        error: function (e1, e2, e3) {

        }
    });
}

function Get_District(Client_ID, State_ID, ID) {
   
    $("#" + ID).empty();  
    $.ajax({
        type: 'POST',
        url: '/Master/Get_Districts',
        autoUpload: true,
        dataType: 'json',
        data: {
            Client_ID: Client_ID,
            State_ID: State_ID
        },
        beforeSend: function () {
            Showloader();
        },
        complete: function () {
            Hideloader();
        },
        success: function (Accnos) {
            
            $("#" + ID).append($('<option/>', { Value: 0, text: "--Select District--" }));
            $.each(Accnos, function (i, Accno) {
                $("#" + ID).append('<option value="' + Accno.District_ID + '">' + Accno.District_Name + '</option>');
            });
        },
        error: function (e1, e2, e3) {
           
        }
    });

}
function Get_City(Client_ID, State_ID,District_ID, ID) {

    $("#" + ID).empty();
    $.ajax({
        type: 'POST',
        url: '/Master/Get_Citys',
        autoUpload: true,
        dataType: 'json',
        data: {
            Client_ID: Client_ID,
            State_ID: State_ID,
            District_ID:District_ID
        },
        beforeSend: function () {
            Showloader();
        },
        complete: function () {
            Hideloader();
        },
        success: function (Accnos) {
            $("#" + ID).append($('<option/>', { Value: 0, text: "--Select City/Taluka--" }));
            $.each(Accnos, function (i, Accno) {
                $("#" + ID).append('<option value="' + Accno.City_ID + '">' + Accno.City_Name + '</option>');
            });
        },
        error: function (e1, e2, e3) {
            
        }
    });
}
function Get_Area(Client_ID, State_ID, District_ID,City_ID, ID) {

    $("#" + ID).empty();
    $.ajax({
        type: 'POST',
        url: '/Master/Get_Areas',
        autoUpload: true,
        dataType: 'json',
        data: {
            Client_ID: Client_ID,
            State_ID: State_ID,
            District_ID: District_ID,
            City_ID: City_ID
        },
        beforeSend: function () {
            Showloader();
        },
        complete: function () {
            Hideloader();
        },
        success: function (Accnos) {
            $("#" + ID).append($('<option/>', { Value: 0, text: "--Select Area/Village--" }));
            $.each(Accnos, function (i, Accno) {
                $("#" + ID).append('<option value="' + Accno.Area_ID + '">' + Accno.Area_Name + '</option>');
            });
        },
        error: function (e1, e2, e3) {

        }
    });
}

function Get_Street(Client_ID, State_ID, District_ID, City_ID, ID) {

    $("#" + ID).empty();
    $.ajax({
        type: 'POST',
        url: '/Master/Get_Streets',
        autoUpload: true,
        dataType: 'json',
        data: {
            Client_ID: Client_ID,
            State_ID: State_ID,
            District_ID: District_ID,
            City_ID: City_ID
        },
        beforeSend: function () {
            Showloader();
        },
        complete: function () {
            Hideloader();
        },
        success: function (Accnos) {
            $("#" + ID).append($('<option/>', { Value: 0, text: "--Select Streets--" }));
            $.each(Accnos, function (i, Accno) {
                $("#" + ID).append('<option value="' + Accno.Street_ID + '">' + Accno.Street_Name + '</option>');
            });
        },
        error: function (e1, e2, e3) {

        }
    });
}
function Get_Division(Client_ID, ID) {
   
    $("#" + ID).empty();

    $.ajax({

        type: 'POST',
        url: '/Division/Get_Division',
        autoUpload: true,
        dataType: 'json',
        data: { Client_ID: Client_ID },

        beforeSend: function () {
            Showloader();
        },
        complete: function () {
            Hideloader();
        },
        success: function (Accnos) {
            $("#" + ID).append($('<option/>', { Value: 0, text: "--Select Division--" }));
            $.each(Accnos, function (i, Accno) {
                $("#" + ID).append('<option value="' + Accno.Division_ID + '">' + Accno.Division_Name + '</option>');
            });
        },
        error: function (e1, e2, e3) {

        }
    });
}
function Get_Depot(Client_ID,Division_ID, ID) {

    $("#" + ID).empty();
    
    $.ajax({

        type: 'POST',
        url: '/Depot/Get_Depot',
        autoUpload: true,
        dataType: 'json',
        data: { Client_ID: Client_ID, Division_ID: Division_ID },

        beforeSend: function () {
            Showloader();
        },
        complete: function () {
            Hideloader();
        },
        success: function (Accnos) {
            $("#" + ID).append($('<option/>', { Value: 0, text: "--Select Depot--" }));
            $.each(Accnos, function (i, Accno) {
                $("#" + ID).append('<option value="' + Accno.Depot_ID + '">' + Accno.Depot_Name + '</option>');
            });
        },
        error: function (e1, e2, e3) {

        }
    });
}
function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}
function Get_Division_Name(Division_Code) {
    var Address = "";
    switch (Division_Code) {
        case 1:
            Address = " PUNE";
            break;
        case 2:
            Address = " NAGPUR";
            break;
        case 3:
            Address = " AURANGABAD";
            break;
        case 4:
            Address = " MUMBAI";
            break;
        case 5:
            Address = " KOLHAPUR";
            break;
        case 6:
            Address = " AMRAVATI";
            break;
        case 7:
            Address = " NASHIK";
            break;
        case 8:
            Address = " LATUR";
            break;
        case 9:
            Address = " KONKAN";
            break;

    }

    return Address;
}

function Get_Division_Name_Marathi(Division_Code) {

    var Address = "";
    switch (Division_Code) {
        case "1":
            Address = " पुणे";
            break;
        case "2":
            Address = " नागपूर";
            break;
        case "3":
            Address = " औरंगाबाद";
            break;
        case "4":
            Address = " मुंबई";
            break;
        case "5":
            Address = " कोल्हापूर";
            break;
        case "6":
            Address = " अमरावती";
            break;
        case "7":
            Address = " नाशिक";
            break;
        case "8":
            Address = " लातूर";
            break;
        case "9":
            Address = " कोकण";
            break;

    }

    return Address;
}
function Get_Payment_Head(Payment_Head) {
  
    var Address = "";
    switch (Payment_Head) {
        case "301":
            Address = "उत्तरपत्रिका गुणपडताळणी";
            break;
        case "302":
            Address = " उत्तरपत्रिका छायाप्रत";
            break;
        case "303":
            Address = "उत्तरपत्रिका पुनर्मूल्यांकन";
            break;


    }

    return Address;
}
function BindSubject(ID)
{
    $("#" + ID).append('<option value="0">Select</option>');
    $("#" + ID).append('<option value="01"> 01 ENGLISH</option>');
    $("#" + ID).append('<option value="02"> 02 MARATHI</option>');
    $("#" + ID).append('<option value="03"> 03 GUJARATI</option>');
    $("#" + ID).append('<option value="04"> 04 HINDI</option>');
    $("#" + ID).append('<option value="05"> 05 URDU</option>');
    $("#" + ID).append('<option value="06"> 06 KANNADA</option>');
    $("#" + ID).append('<option value="07"> 07 SINDHI</option>');
    $("#" + ID).append('<option value="08"> 08 MALAYALAM</option>');
    $("#" + ID).append('<option value="09"> 09 TAMIL</option>');
    $("#" + ID).append('<option value="10"> 10 TELUGU</option>');
    $("#" + ID).append('<option value="11"> 11 PUNJABI</option>');
    $("#" + ID).append('<option value="12"> 12 BENGALI</option>');
    $("#" + ID).append('<option value="13"> 13 FRENCH</option>');
    $("#" + ID).append('<option value="14"> 14 GERMAN</option>');
    $("#" + ID).append('<option value="16"> 16 ARDH</option>');
    $("#" + ID).append('<option value="20"> 20 RUSSIAN</option>');
    $("#" + ID).append('<option value="21"> 21 JAPNESE</option>');
    $("#" + ID).append('<option value="32"> 32 GENERAL KNOWLEDGE</option>');
    $("#" + ID).append('<option value="33"> 33 SANSKRIT</option>');
    $("#" + ID).append('<option value="35"> 35 PALI</option>');
    $("#" + ID).append('<option value="36"> 36 ARABIC</option>');
    $("#" + ID).append('<option value="37"> 37 PERSIAN</option>');
    $("#" + ID).append('<option value="38"> 38 HISTORY</option>');
    $("#" + ID).append('<option value="39"> 39 GEOGRAPHY</option>');
    $("#" + ID).append('<option value="40"> 40 MATHS & STATS.</option>');
    $("#" + ID).append('<option value="41"> 41 GEOLOGY</option>');
    $("#" + ID).append('<option value="42"> 42 POLITICAL SCIENCE</option>');
    $("#" + ID).append('<option value="43"> 43 CHILD DEVELOPMENT</option>');
    $("#" + ID).append('<option value="44"> 44 TEXTILE LNDRY&CLTHNG</option>');
    $("#" + ID).append('<option value="45"> 45 SOCIOLOGY</option>');
    $("#" + ID).append('<option value="46"> 46 PHILOSOPHY</option>');
    $("#" + ID).append('<option value="47"> 47 LOGIC</option>');
    $("#" + ID).append('<option value="48"> 48 PSYCHOLOGY</option>');
    $("#" + ID).append('<option value="49"> 49 ECONOMICS</option>');
    $("#" + ID).append('<option value="50"> 50 BOOK-KPNG & ACCNTNCY</option>');
    $("#" + ID).append('<option value="51"> 51 ORGANISATION OF COMM</option>');
    $("#" + ID).append('<option value="52"> 52 SECRETARIAL PRACTICE</option>');
    $("#" + ID).append('<option value="53"> 53 CO-OPERATION</option>');
    $("#" + ID).append('<option value="54"> 54 PHYSICS</option>');
    $("#" + ID).append('<option value="55"> 55 CHEMISTRY</option>');
    $("#" + ID).append('<option value="56"> 56 BIOLOGY</option>');
    $("#" + ID).append('<option value="57"> 57 DRAWING</option>');
    $("#" + ID).append('<option value="58"> 58 DESIGN & COLOUR</option>');
    $("#" + ID).append('<option value="59"> 59 COMPOSITION</option>');
    $("#" + ID).append('<option value="60"> 60 HIST OF ARTS & APPR</option>');
    $("#" + ID).append('<option value="65"> 65 HIST&DVLP-INDN MUSIC</option>');
    $("#" + ID).append('<option value="66"> 66 VOCAL LIGHT MUSIC</option>');
    $("#" + ID).append('<option value="67"> 67 VOCAL CLASSICAL MUSI</option>');
    $("#" + ID).append('<option value="68"> 68 INSTRUMENTAL MUSIC</option>');
    $("#" + ID).append('<option value="69"> 69 INDIAN MUSIC(PER.TH)</option>');
    $("#" + ID).append('<option value="73"> 73 EUROPEAN MUSIC</option>');
    $("#" + ID).append('<option value="75"> 75 CROP PRODUCTION II</option>');
    $("#" + ID).append('<option value="76"> 76 ANIMAL SCIENCE II</option>');
    $("#" + ID).append('<option value="77"> 77 DEFENCE STUDIES</option>');
    $("#" + ID).append('<option value="78"> 78 EDUCATION</option>');
    $("#" + ID).append('<option value="79"> 79 AUTO ELECTRICALS</option>');
    $("#" + ID).append('<option value="80"> 80 STENOGRAPHY</option>');
    $("#" + ID).append('<option value="85"> 85 LIBRARY SCIENCES</option>');
    $("#" + ID).append('<option value="87"> 87 AVESTA PAHALVI</option>');
    $("#" + ID).append('<option value="88"> 88 MATH & STAT (COMM)</option>');
    $("#" + ID).append('<option value="89"> 89 STENOGRAPHY-MARATHI</option>');
    $("#" + ID).append('<option value="90"> 90 GEN.FOUNDATION CORS.</option>');
    $("#" + ID).append('<option value="91"> 91 DANCING THEORY</option>');
    $("#" + ID).append('<option value="92"> 92 KATHAK  PRACTICAL</option>');
    $("#" + ID).append('<option value="93"> 93 KATHAKALI PRACT</option>');
    $("#" + ID).append('<option value="94"> 94 BHRAT-NATYAM</option>');
    $("#" + ID).append('<option value="95"> 95 ODDISSI PRACT</option>');
    $("#" + ID).append('<option value="96"> 96 MANIPURI PRACT</option>');
    $("#" + ID).append('<option value="97"> 97 INFORMATION TECH.</option>');
    $("#" + ID).append('<option value="98"> 98 INFORMATION TECH.</option>');
    $("#" + ID).append('<option value="99"> 99 INFORMATION TECH.</option>');
    $("#" + ID).append('<option value="A1"> A1 ELECTRICAL MAINT.</option>');
    $("#" + ID).append('<option value="A2"> A2 MECHANICAL MAINT.</option>');
    $("#" + ID).append('<option value="A3"> A3 SCTR & MOTR CYC SERV</option>');
    $("#" + ID).append('<option value="A4"> A4 GENERAL CIVIL ENGG.</option>');
    $("#" + ID).append('<option value="A5"> A5 BANKING</option>');
    $("#" + ID).append('<option value="A6"> A6 INSURANCE</option>');
    $("#" + ID).append('<option value="A7"> A7 OFFICE MANAGEMENT</option>');
    $("#" + ID).append('<option value="A8"> A8 MRKTNG.& SLSMANSHIP</option>');
    $("#" + ID).append('<option value="A9"> A9 SMALL IND.& SLF.EMP.</option>');
    $("#" + ID).append('<option value="B1"> B1 ELEM. IND.MGT.</option>');
    $("#" + ID).append('<option value="B2"> B2 ANIMAL SCI.& DAIRYNG</option>');
    $("#" + ID).append('<option value="B3"> B3 FARM MECHANICS</option>');
    $("#" + ID).append('<option value="B4"> B4 CROP SCIENCE</option>');
    $("#" + ID).append('<option value="B5"> B5 HORTICULTURE</option>');
    $("#" + ID).append('<option value="B6"> B6 COOKERY</option>');
    $("#" + ID).append('<option value="B7"> B7 BAKERY & CONFECT.</option>');
    $("#" + ID).append('<option value="B8"> B8 FOOD PRESERVATION</option>');
    $("#" + ID).append('<option value="B9"> B9 FISH PROC. TECH.</option>');
    $("#" + ID).append('<option value="C1"> C1 FRSH WATR FSH CULTR</option>');
    $("#" + ID).append('<option value="C2"> C2 ELECTRONICS</option>');
    $("#" + ID).append('<option value="C3"> C3 CHEM. PLANT OPERATN</option>');
    $("#" + ID).append('<option value="C4"> C4 MLTIPRPSE HLTH WRKR</option>');
    $("#" + ID).append('<option value="C5"> C5 ELE.LAB TECHNOLOGY</option>');
    $("#" + ID).append('<option value="D9"> D9 COMP. SC.</option>');
    $("#" + ID).append('<option value="J1"> J1 ELECTRONICS TECH. 1</option>');
    $("#" + ID).append('<option value="J2"> J2 ELECTRONICS TECH. 2</option>');
    $("#" + ID).append('<option value="J3"> J3 ELECTRONICS TECH. 3</option>');
    $("#" + ID).append('<option value="J4"> J4 ELEC.APPLNS.MAINT. 1</option>');
    $("#" + ID).append('<option value="J5"> J5 ELEC.APPLNS.MAINT. 2</option>');
    $("#" + ID).append('<option value="J6"> J6 ELEC.APPLNS.MAINT. 3</option>');
    $("#" + ID).append('<option value="J7"> J7 BLDG. MAINTENANCE 1</option>');
    $("#" + ID).append('<option value="J8"> J8 BLDG. MAINTENANCE 2</option>');
    $("#" + ID).append('<option value="J9"> J9 BLDG. MAINTENANCE 3</option>');
    $("#" + ID).append('<option value="K1"> K1 AUTO.ENGG.TECHNICN 1</option>');
    $("#" + ID).append('<option value="K2"> K2 AUTO.ENGG.TECHNICN 2</option>');
    $("#" + ID).append('<option value="K3"> K3 AUTO.ENGG.TECHNICN 3</option>');
    $("#" + ID).append('<option value="K4"> K4 MECHANICAL TECH. 1</option>');
    $("#" + ID).append('<option value="K5"> K5 MECHANICAL TECH. 2</option>');
    $("#" + ID).append('<option value="K6"> K6 MECHANICAL TECH. 3</option>');
    $("#" + ID).append('<option value="L1"> L1 AGRI.HORTICULTURE 1</option>');
    $("#" + ID).append('<option value="L2"> L2 AGRI.HORTICULTURE 2</option>');
    $("#" + ID).append('<option value="L3"> L3 AGRI.HORTICULTURE 3</option>');
    $("#" + ID).append('<option value="L4"> L4 CROP SCI MANAGMENT 1</option>');
    $("#" + ID).append('<option value="L5"> L5 CROP SCI MANAGMENT 2</option>');
    $("#" + ID).append('<option value="L6"> L6 CROP SCI MANAGMENT 3</option>');
    $("#" + ID).append('<option value="L7"> L7 POST-HARVEST TECH 1</option>');
    $("#" + ID).append('<option value="L8"> L8 POST-HARVEST TECH 2</option>');
    $("#" + ID).append('<option value="L9"> L9 POST-HARVEST TECH 3</option>');
    $("#" + ID).append('<option value="M1"> M1 BUSI.FIN.ACC.AUDIT 1</option>');
    $("#" + ID).append('<option value="M2"> M2 BUSI.FIN.ACC.AUDIT 2</option>');
    $("#" + ID).append('<option value="M3"> M3 BUSI.FIN.ACC.AUDIT 3</option>');
    $("#" + ID).append('<option value="M4"> M4 MRKTG.SALESMANSHIP 1</option>');
    $("#" + ID).append('<option value="M5"> M5 MRKTG.SALESMANSHIP 2</option>');
    $("#" + ID).append('<option value="M6"> M6 MRKTG.SALESMANSHIP 3</option>');
    $("#" + ID).append('<option value="M7"> M7 PURCH.STORE KEEPNG 1</option>');
    $("#" + ID).append('<option value="M8"> M8 PURCH.STORE KEEPNG 2</option>');
    $("#" + ID).append('<option value="M9"> M9 PURCH.STORE KEEPNG 3</option>');
    $("#" + ID).append('<option value="N1"> N1 INLAND FISHERIES 1</option>');
    $("#" + ID).append('<option value="N2"> N2 INLAND FISHERIES 2</option>');
    $("#" + ID).append('<option value="N3"> N3 INLAND FISHERIES 3</option>');
    $("#" + ID).append('<option value="N4"> N4 FISH PROC.MRKT.TEC.1</option>');
    $("#" + ID).append('<option value="N5"> N5 FISH PROC.MRKT.TEC.2</option>');
    $("#" + ID).append('<option value="N6"> N6 FISH PROC.MRKT.TEC.3</option>');
    $("#" + ID).append('<option value="N7"> N7 WATER SHED MGMT. 1</option>');
    $("#" + ID).append('<option value="N8"> N8 WATER SHED MGMT. 2</option>');
    $("#" + ID).append('<option value="N9"> N9 WATER SHED MGMT. 3</option>');
    $("#" + ID).append('<option value="P1"> P1 MEDICAL LAB.TECH. 1</option>');
    $("#" + ID).append('<option value="P2"> P2 MEDICAL LAB.TECH. 2</option>');
    $("#" + ID).append('<option value="P3"> P3 MEDICAL LAB.TECH. 3</option>');
    $("#" + ID).append('<option value="P4"> P4 X-RAY TECHNICIAN 1</option>');
    $("#" + ID).append('<option value="P5"> P5 X-RAY TECHNICIAN 2</option>');
    $("#" + ID).append('<option value="P6"> P6 X-RAY TECHNICIAN 3</option>');
    $("#" + ID).append('<option value="P7"> P7 OPTHALMIC TECHNICN.1</option>');
    $("#" + ID).append('<option value="P8"> P8 OPTHALMIC TECHNICN.2</option>');
    $("#" + ID).append('<option value="P9"> P9 OPTHALMIC TECHNICN.3</option>');
    $("#" + ID).append('<option value="Q1"> Q1 CRECHE PRE-SCL.MNG.1</option>');
    $("#" + ID).append('<option value="Q2"> Q2 CRECHE PRE-SCL.MNG.2</option>');
    $("#" + ID).append('<option value="Q3"> Q3 CRECHE PRE-SCL.MNG.3</option>');
    $("#" + ID).append('<option value="R1"> R1 CATERING COOKERY 1</option>');
    $("#" + ID).append('<option value="R2"> R2 CATERING COOKERY 2</option>');
    $("#" + ID).append('<option value="R3"> R3 CATERING COOKERY 3</option>');
    $("#" + ID).append('<option value="R4"> R4 INST.HOUSEKEEPING 1</option>');
    $("#" + ID).append('<option value="R5"> R5 INST.HOUSEKEEPING 2</option>');
    $("#" + ID).append('<option value="R6"> R6 INST.HOUSEKEEPING 3</option>');
    $("#" + ID).append('<option value="R7"> R7 BAKERY ADV.CONFEC. 3</option>');
    $("#" + ID).append('<option value="R8"> R8 BAKERY ADV.CONFEC. 1</option>');
    $("#" + ID).append('<option value="R9"> R9 BAKERY ADV.CONFEC. 2</option>');
    $("#" + ID).append('<option value="S1"> S1 TOUR.TRAV.TECHNIQ. 1</option>');
    $("#" + ID).append('<option value="S2"> S2 TOUR.TRAV.TECHNIQ. 2</option>');
    $("#" + ID).append('<option value="S3"> S3 TOUR.TRAV.TECHNIQ. 3</option>');
    $("#" + ID).append('<option value="T1"> T1 REP.MAINT.REWIND.EM1</option>');
    $("#" + ID).append('<option value="T2"> T2 REP.MAINT.REWIND.EM2</option>');
    $("#" + ID).append('<option value="T3"> T3 REP.MAINT.REWIND.EM3</option>');
    $("#" + ID).append('<option value="U1"> U1 INSURANCE 1</option>');
    $("#" + ID).append('<option value="U2"> U2 INSURANCE 2</option>');
    $("#" + ID).append('<option value="U3"> U3 INSURANCE 3</option>');
    $("#" + ID).append('<option value="U4"> U4 BANKING   1</option>');
    $("#" + ID).append('<option value="U5"> U5 BANKING   2</option>');
    $("#" + ID).append('<option value="U6"> U6 BANKING   3</option>');
    $("#" + ID).append('<option value="U7"> U7 OFFICE MANAGEMENT 1</option>');
    $("#" + ID).append('<option value="U8"> U8 OFFICE MANAGEMENT 2</option>');
    $("#" + ID).append('<option value="U9"> U9 OFFICE MANAGEMENT 3</option>');
    $("#" + ID).append('<option value="V1"> V1 SERICULTURE  1</option>');
    $("#" + ID).append('<option value="V2"> V2 SERICULTURE  2</option>');
    $("#" + ID).append('<option value="V3"> V3 SERICULTURE  3</option>');
    $("#" + ID).append('<option value="V4"> V4 SEED PRODUCTION TEC1</option>');
    $("#" + ID).append('<option value="V5"> V5 SEED PRODUCTION TEC2</option>');
    $("#" + ID).append('<option value="V6"> V6 SEED PRODUCTION TEC3</option>');
    $("#" + ID).append('<option value="V7"> V7 POULTRY PRODUCTION 1</option>');
    $("#" + ID).append('<option value="V8"> V8 POULTRY PRODUCTION 2</option>');
    $("#" + ID).append('<option value="V9"> V9 POULTRY PRODUCTION 3</option>');
    $("#" + ID).append('<option value="W1"> W1 DAIRY TECHNOLOGY  1</option>');
    $("#" + ID).append('<option value="W2"> W2 DAIRY TECHNOLOGY  2</option>');
    $("#" + ID).append('<option value="W3"> W3 DAIRY TECHNOLOGY  3</option>');
    $("#" + ID).append('<option value="W4"> W4 PLANT PROTECTION  1</option>');
    $("#" + ID).append('<option value="W5"> W5 PLANT PROTECTION  2</option>');
    $("#" + ID).append('<option value="W6"> W6 PLANT PROTECTION  3</option>');
    $("#" + ID).append('<option value="W7"> W7 AGRICULTURE CHEMIC.1</option>');
    $("#" + ID).append('<option value="W8"> W8 AGRICULTURE CHEMIC.2</option>');
    $("#" + ID).append('<option value="W9"> W9 AGRICULTURE CHEMIC.3</option>');
    $("#" + ID).append('<option value="X1"> X1 COMPUTER TECHNIQUE 1</option>');
    $("#" + ID).append('<option value="X2"> X2 COMPUTER TECHNIQUE 2</option>');
    $("#" + ID).append('<option value="X3"> X3 COMPUTER TECHNIQUE 3</option>');
    $("#" + ID).append('<option value="Y1"> Y1 INTERNET TECH 1</option>');
    $("#" + ID).append('<option value="Y2"> Y2 INTERNET TECH 2</option>');
    $("#" + ID).append('<option value="Y3"> Y3 INTERNET TECH 3</option>');
    $("#" + ID).append('<option value="22"> 22 ENGLISH LITERATURE</option>');
    $("#" + ID).append('<option value="23"> 23 MARATHI LITERATURE</option>');
    $("#" + ID).append('<option value="24"> 24 HINDI APPLIED</option>');
    $("#" + ID).append('<option value="31"> 31 ENVIRONMENT EDU.</option>');
    $("#" + ID).append('<option value="EA"> EA ELECTRONICS TECHNOLO</option>');
    $("#" + ID).append('<option value="EB"> EB ELECTRONICS TECHNOLO</option>');
    $("#" + ID).append('<option value="EC"> EC ELECTRONICS TECHNOLO</option>');
    $("#" + ID).append('<option value="FA"> FA ELECTRICAL TECHNOLOG</option>');
    $("#" + ID).append('<option value="FB"> FB ELECTRICAL TECHNOLOG</option>');
    $("#" + ID).append('<option value="FC"> FC ELECTRICAL TECHNOLOG</option>');
    $("#" + ID).append('<option value="GA"> GA AUTOMOBILE TECHNOLOG</option>');
    $("#" + ID).append('<option value="GB"> GB AUTOMOBILE TECHNOLOG</option>');
    $("#" + ID).append('<option value="GC"> GC AUTOMOBILE TECHNOLOG</option>');
    $("#" + ID).append('<option value="HA"> HA CONSTRUCTION TECHNOL</option>');
    $("#" + ID).append('<option value="HB"> HB CONSTRUCTION TECHNOL</option>');
    $("#" + ID).append('<option value="HC"> HC CONSTRUCTION TECHNOL</option>');
    $("#" + ID).append('<option value="IA"> IA MECHANICAL TECHNOLOG</option>');
    $("#" + ID).append('<option value="IB"> IB MECHANICAL TECHNOLOG</option>');
    $("#" + ID).append('<option value="IC"> IC MECHANICAL TECHNOLOG</option>');
    $("#" + ID).append('<option value="JA"> JA COMPUTER TECHNOLOGY</option>');
    $("#" + ID).append('<option value="JB"> JB COMPUTER TECHNOLOGY</option>');
    $("#" + ID).append('<option value="JC"> JC COMPUTER TECHNOLOGY</option>');
    $("#" + ID).append('<option value="NA"> NA FISHERIES TECHNOLOGY</option>');
    $("#" + ID).append('<option value="NB"> NB FISHERIES TECHNOLOGY</option>');
    $("#" + ID).append('<option value="NC"> NC FISHERIES TECHNOLOGY</option>');
    $("#" + ID).append('<option value="KA"> KA HORTICULTURE 1</option>');
    $("#" + ID).append('<option value="KB"> KB HORTICULTURE 2</option>');
    $("#" + ID).append('<option value="KC"> KC HORTICULTURE 3</option>');
    $("#" + ID).append('<option value="LA"> LA CROP SCIENCE 1</option>');
    $("#" + ID).append('<option value="LB"> LB CROP SCIENCE 2</option>');
    $("#" + ID).append('<option value="LC"> LC CROP SCIENCE 3</option>');
    $("#" + ID).append('<option value="MA"> MA ANIMAL HUSBANDRY & D</option>');
    $("#" + ID).append('<option value="MB"> MB ANIMAL HUSBANDRY & D</option>');
    $("#" + ID).append('<option value="MC"> MC ANIMAL HUSBANDRY & D</option>');
    $("#" + ID).append('<option value="OA"> OA MEDICAL LABORATORY T</option>');
    $("#" + ID).append('<option value="OB"> OB MEDICAL LABORATORY T</option>');
    $("#" + ID).append('<option value="OC"> OC MEDICAL LABORATORY T</option>');
    $("#" + ID).append('<option value="PA"> PA RADIOLOGY TECHNICIAN</option>');
    $("#" + ID).append('<option value="PB"> PB RADIOLOGY TECHNICIAN</option>');
    $("#" + ID).append('<option value="PC"> PC RADIOLOGY TECHNICIAN</option>');
    $("#" + ID).append('<option value="QA"> QA CHILD.OLD AGE & HLT</option>');
    $("#" + ID).append('<option value="QB"> QB CHILD.OLD AGE & HLT</option>');
    $("#" + ID).append('<option value="QC"> QC CHILD.OLD AGE & HLT</option>');
    $("#" + ID).append('<option value="RA"> RA OPHTHALMIC TECHNICIA</option>');
    $("#" + ID).append('<option value="RB"> RB OPHTHALMIC TECHNICIA</option>');
    $("#" + ID).append('<option value="RC"> RC OPHTHALMIC TECHNICIA</option>');
    $("#" + ID).append('<option value="SA"> SA FOOD PRODUCTS TECHNO</option>');
    $("#" + ID).append('<option value="SB"> SB FOOD PRODUCTS TECHNO</option>');
    $("#" + ID).append('<option value="SC"> SC FOOD PRODUCTS TECHNO</option>');
    $("#" + ID).append('<option value="TA"> TA TOURISM & HOSPITALIT</option>');
    $("#" + ID).append('<option value="TB"> TB TOURISM & HOSPITALIT</option>');
    $("#" + ID).append('<option value="TC"> TC TOURISM & HOSPITALIT</option>');
    $("#" + ID).append('<option value="UA"> UA ACCOUNTING & OFF MAN</option>');
    $("#" + ID).append('<option value="UB"> UB ACCOUNTING & OFF MAN</option>');
    $("#" + ID).append('<option value="UC"> UC ACCOUNTING & OFF MAN</option>');
    $("#" + ID).append('<option value="VA"> VA MARKETING & RETAIL M</option>');
    $("#" + ID).append('<option value="VB"> VB MARKETING & RETAIL M</option>');
    $("#" + ID).append('<option value="VC"> VC MARKETING & RETAIL M</option>');
    $("#" + ID).append('<option value="WA"> WA LOGISTICS & SUPPLY M</option>');
    $("#" + ID).append('<option value="WB"> WB LOGISTICS & SUPPLY M</option>');
    $("#" + ID).append('<option value="WC"> WC LOGISTICS & SUPPLY M</option>');
    $("#" + ID).append('<option value="XA"> XA BANKING FIN.SERV. &</option>');
    $("#" + ID).append('<option value="XB"> XB BANKING FIN.SERV. &</option>');
    $("#" + ID).append('<option value="XC"> XC BANKING FIN.SERV. &</option>');
    $("#" + ID).append('<option value="E1"> E1 AUTOMOBILE SERVICE T</option>');
    $("#" + ID).append('<option value="E2"> E2 MULTI SKILL(GENERAL</option>');
    $("#" + ID).append('<option value="E3"> E3 MULTI SKILL(GEN ELEC</option>');
    $("#" + ID).append('<option value="E4"> E4 MULTI SKILL(GARDENIN</option>');
    $("#" + ID).append('<option value="E5"> E5 AUTOMOBILE (BRIDGE C</option>');
    $("#" + ID).append('<option value="E6"> E6 MULTI SKILL(FOOD PRO</option>');
    $("#" + ID).append('<option value="E7"> E7 RETAIL SALES ASSOCIA</option>');
    $("#" + ID).append('<option value="E8"> E8 HEALTHCARE GEN-DUTY</option>');
    $("#" + ID).append('<option value="E9"> E9 BEAUTY AND WELLNESS</option>');
    $("#" + ID).append('<option value="F1"> F1 SPORTS-PHYSICAL TRAI</option>');

}
function Bind_Table(data, ID) {
    var htmldata = "", j = 1, k = 1;
    var col = [];
    for (var i = 0; i < data.length; i++) {
        for (var key in data[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }
    htmldata += `<tr>`;
    for (var i = 0; i < col.length; i++) {
        for (var i = 0; i < col.length; i++) {
            htmldata += `<th>` + col[i] + `</th>`;

        }
    }
    htmldata += `</tr>`;
    for (var i = 0; i < data.length; i++) {
        htmldata += `<tr>`;
        for (var j = 0; j < col.length; j++) {
            var value = data[i][col[j]];
            if (value == null) { value = ""; }
            htmldata += `<td>` + value + `</td>`;
        }
        htmldata += `</tr>`;
    } $("#" + ID).append(htmldata);
}
//------------------------------------------------------------------------------------------------------------------------------
//console.log(Point_JSON.sort(GetSortOrder("Point_Name")));
//function GetSortOrder(prop) {
//    return function (a, b) {
//        if (a[prop] > b[prop]) {
//            return 1;
//        } else if (a[prop] < b[prop]) {
//            return -1;
//        }
//        return 0;
//    }
//}
//------------------------------------------------------------------------------------------------------------------------------

//$("#A").click(function () {
//    alert($(this).attr("id"));
//});
//[HttpGet]
//public ActionResult Client_Type()
//{
//    return View();
//}
//[HttpPost]
//public ActionResult Client_Type(Client_Type_Model _model)
//{
//    if (ModelState.IsValid == true)
//{
//    try
//    {
//int result =0;
//DataAccessLayer DataAccessLayer = new DataAccessLayer();
//if (_model.Action == "Submit")
//{
//}
//if (_model.Action == "Update")
//{
//}
//        return Json(new { Result = "Success", message = "Client Type Added Successfully..!!!" }, JsonRequestBehavior.AllowGet);
//    }
//    catch (Exception exe)
//    {
//        return Json(new { Result = "Fail", message = "Unable to Save Record..!!!" }, JsonRequestBehavior.AllowGet);
//    }

//}
//else
//{

//                return Json(new { Result = "Fail", message = "Please Fill info with Proper Validations..!!!" }, JsonRequestBehavior.AllowGet);
//}
//}
