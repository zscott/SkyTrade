describe("SkyTrade", function () {

    beforeEach(function () {
       browser.ignoreSynchronization = true;
    });

    describe("index", function () {
        browser.get('/#');

        it("should display the correct title", function () {
            expect(browser.getTitle()).toBe('SKY TRADE: Easy Bitcoin Trading');
        });

        it("should display the default currency pairs", function () {
            var expectedSymbol = ['DOGE/BTC', 'NMC/BTC', 'PPC/BTC', 'NXT/BTC', 'LTC/BTC'];
            element.all(by.css('.market-symbol')).then( function(results) {
               results.forEach( function(symbol, i) {
                   expect(symbol.getText()).toBe(expectedSymbol[i]);
               });
            });
        });
    });

});