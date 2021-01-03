describe("Helper test (with setup and tear-down)", function() {
    beforeEach(function () {
      // initialization logic
        serverNameInput.value = 'Alice';
        
        billAmtInput.value    = 200;
        tipAmtInput.value     = 30;
        submitServerInfo();
        submitPaymentInfo();
    });
  
    it('test for sumPaymentTotal()', function () {
        expect(sumPaymentTotal('tipAmt')).toEqual(30);
        expect(sumPaymentTotal('billAmt')).toEqual(200);
        expect(sumPaymentTotal('tipPercent')).toEqual(15);
      });
  
    it('test for calculateTipPercent()', function () {
  
      expect(calculateTipPercent(100 , 20)).toEqual(20);
      expect(calculateTipPercent(100 , 0)).toEqual(0);
    });

    
    it('test for appendTd()', function () {

        let tr  = document.querySelector("#summaryTable tbody tr");
        appendTd(tr , "test");
        expect(tr.querySelectorAll("td").length).toEqual(4);
        expect(tr.querySelectorAll("td")[3].innerText).toEqual("test");
      });

      
    it('test for appendDeleteBtn()', function () {

        let tbody  = document.querySelector("#serverTable tbody");
        let tr  = document.createElement("tr");
        tbody.append(tr);

        appendDeleteBtn(tr);

        expect(tr.querySelectorAll("td").length).toEqual(1);
        expect(tr.querySelectorAll("td")[0].innerText).toEqual("X");
      });

      
    it('test for deleteServer()', function () {
        //add another server
        serverNameInput.value = 'Peter';
        submitServerInfo();

        let serverId    = Object.keys(allServers)[0];
        //delete the first server
        deleteServer(serverId);

        
        let tbody  = document.querySelector("#serverTable tbody");
        let trs    = tbody.querySelectorAll("tr");

        expect(Object.keys(allServers).length).toEqual(1);
        expect(trs.length).toEqual(1);
        expect(trs[0].querySelectorAll("td")[0].innerText).toEqual("Peter");
        expect(trs[0].querySelectorAll("td")[1].innerText).toEqual("$30.00");
      });

      
    it('test for deletePayment()', function () {
        //add another payment
        billAmtInput.value    = 100;
        tipAmtInput.value     = 10;
        submitPaymentInfo();

        let tbody  = document.querySelector("#paymentTable tbody");
        let tr  = tbody.querySelector("tr");
        //delete the first payment
        deletePayment(tr);


        //test the payment table
        let trs    = tbody.querySelectorAll("tr");
        expect(Object.keys(allPayments).length).toEqual(1);
        expect(trs.length).toEqual(1);
        expect(trs[0].querySelectorAll("td")[0].innerText).toEqual("$100");
        expect(trs[0].querySelectorAll("td")[1].innerText).toEqual("$10");
        expect(trs[0].querySelectorAll("td")[2].innerText).toEqual("10%");

        //test the server table
        let serverTds  = serverTbody.querySelectorAll("tr td");
        expect(serverTds[1].innerText).toEqual("$10.00");

        //test the summary table
        expect(summaryTds[0].innerText).toEqual('$100');
        expect(summaryTds[1].innerText).toEqual('$10');
        expect(summaryTds[2].innerText).toEqual('10%');
      });

    afterEach(function() {
        // teardown logic
        serverId    = 0;
        allServers  = {};
        serverNameInput.value = '';
        serverTbody.innerHTML = '';

        billAmtInput.value    = "";
        tipAmtInput.value     = "";
        allPayments       = {};
        paymentId = 0;
        document.querySelector("#paymentTable tbody").innerHTML   = "";
        document.querySelector("#summaryTable tbody tr").innerHTML = "<td></td><td></td><td></td>";
    });
  });
  