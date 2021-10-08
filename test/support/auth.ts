/**
 * Ensures visit to a page is authenticated with a dummy user
 */
Cypress.Commands.add("authVisit", (path) => {
  cy.visit(path, {
    onBeforeLoad: (window) => {
      let nextData;
      Object.defineProperty(window, "__NEXT_DATA__", {
        set(o) {
          // here is our change to modify the injected parsed data
          o.props.pageProps.authenticated = true;
          o.props.pageProps.user = {
            sub: "LA-EVW81B",
            email_verified: true,
            phone_number_verified: true,
            phone_number: "+4400000001234",
            email: "test1@test.com",
          };
          nextData = o;
        },
        get() {
          return nextData;
        },
      });
    },
  });
});
