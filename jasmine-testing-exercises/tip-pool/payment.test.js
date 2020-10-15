describe("payment test (with setup and tear-down)", function() {
    beforeEach(function () {
      // initialization logic
      billAmtInput.value    = 200;
      tipAmtInput.value     = 30;
    });
  
    it('test for submitPaymentInfo()', function () {
        submitPaymentInfo();
        expect(Object.keys(allPayments).length).toEqual(1);
        expect(allPayments[Object.keys(allPayments)[0]]['tipAmt']).toEqual('30');
        expect(allPayments[Object.keys(allPayments)[0]]['billAmt']).toEqual('200');
        expect(allPayments[Object.keys(allPayments)[0]]['tipPercent']).toEqual(15);
      });

      
    it('test for createCurPayment()', function () {
        expect(createCurPayment()['tipAmt']).toEqual('30');
        expect(createCurPayment()['billAmt']).toEqual('200');
        expect(createCurPayment()['tipPercent']).toEqual(15);

        //no tip
        billAmtInput.value    = 200;
        tipAmtInput.value     = 0;
        expect(createCurPayment()['tipAmt']).toEqual('0');
        expect(createCurPayment()['billAmt']).toEqual('200');
        expect(createCurPayment()['tipPercent']).toEqual(0);

        //no bill
        billAmtInput.value    = 0;
        tipAmtInput.value     = 0;
        expect(createCurPayment()).toEqual(undefined);

        
        //no bill
        billAmtInput.value    = -1;
        tipAmtInput.value     = 0;
        expect(createCurPayment()).toEqual(undefined);
        
        //no bill
        billAmtInput.value    = "";
        tipAmtInput.value     = "";
        expect(createCurPayment()).toEqual(undefined);
    });
  
    it('test for appendPaymentTable()', function () {
        appendPaymentTable(createCurPayment());

        //adding on row
        let trs  = paymentTbody.querySelectorAll('tr');
        expect(trs.length).toEqual(1);

        //adding 3 columns 
        let tds  = trs[0].querySelectorAll('td');
        expect(tds.length).toEqual(4);
        expect(tds[0].innerText).toEqual('$200');
        expect(tds[1].innerText).toEqual('$30');
        expect(tds[2].innerText).toEqual('15%');
        expect(tds[3].innerText).toEqual('X');
    });

    
    it('test for updateSummary()', function () {
        allPayments['payment0'] = {
            billAmt:'200' ,
            tipAmt:'30',
            tipPercent:15
        };
        
        allPayments['payment1'] = {
            billAmt:'300' ,
            tipAmt:'30',
            tipPercent:10
        };

        updateSummary();

        expect(summaryTds[0].innerText).toEqual('$500');
        expect(summaryTds[1].innerText).toEqual('$60');
        expect(summaryTds[2].innerText).toEqual('13%');
    });
  
    afterEach(function() {
      // teardown logic
      billAmtInput.value    = "";
      tipAmtInput.value     = "";
      allPayments       = {};
      paymentId = 0;
      document.querySelector("#paymentTable tbody").innerHTML   = "";
      document.querySelector("#summaryTable tbody tr").innerHTML = "<td></td><td></td><td></td>";
    });
  });
  