describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
    
    billAmtInput.value    = 200;
    tipAmtInput.value     = 30;
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  it('should not add a new server on submitServerInfo() with empty input', function () {
    serverNameInput.value = '';
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(0);
  });

  it('should update #servertable on updateServerTable()', function () {
    submitPaymentInfo();
    submitServerInfo();
    updateServerTable();

    let curTdList = document.querySelectorAll('#serverTable tbody tr td');

    expect(curTdList.length).toEqual(3);
    expect(curTdList[0].innerText).toEqual('Alice');
    expect(curTdList[1].innerText).toEqual('$30.00');
    expect(curTdList[2].innerText).toEqual('X');
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
