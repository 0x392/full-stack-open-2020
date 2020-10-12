describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");

    // Create a user to backend
    const user = {
      name: "name_1",
      username: "username_1",
      password: "password_1",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);

    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.get("form#login-form").contains("Sign In to the Application");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("input#username").type("username_1");
      cy.get("input#password").type("password_1");
      cy.get("button#login-button").click();

      cy.contains("Signed in as name_1");
    });

    it("fails with wrong credentials", function () {
      cy.get("input#username").type("username_1");
      cy.get("input#password").type("wrong_password");
      cy.get("button#login-button").click();

      cy.get(".notification")
        .should("contain", "invalid username or password")
        .and("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "username_1", password: "password_1" });
    });

    it("A blog can be created", function () {
      cy.get("button.toggle-button").click();
      cy.get("input#new-blog-title").type("test_title");
      cy.get("input#new-blog-author").type("test_author");
      cy.get("input#new-blog-url").type("test_url");
      cy.get("button#create-new-blog-button").click();
      cy.contains('A new blog "test_title" by "test_author" added');

      cy.get(".blog-title").contains("test_title");
      cy.get(".blog-author").contains("test_author");
    });

    describe("When there's a blog", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "test_title",
          author: "test_author",
          url: "test_url",
          likes: 2,
        });
      });

      it("A user can like a blog", function () {
        cy.contains("Show detail").click();
        cy.get(".blog-likes").contains(2);
        cy.contains("Like").click();
        cy.get(".blog-likes").contains(3);
      });

      it("The user who created a blog can delete it", function () {
        cy.contains("Show detail").click();
        cy.contains("Remove").click();
        cy.on("window:confirm", () => true);

        cy.contains("test_title").should("not.exist");
        cy.contains("test_author").should("not.exist");
      });
    });

    describe("When there are three blogs", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "test_title_1",
          author: "test_author_1",
          url: "test_url_1",
          likes: 5,
        });
        cy.createBlog({
          title: "test_title_2",
          author: "test_author_2",
          url: "test_url_2",
          likes: 3,
        });
        cy.createBlog({
          title: "test_title_3",
          author: "test_author_3",
          url: "test_url_3",
          likes: 6,
        });
      });

      it.only("the blogs are ordered according to likes with the blog with the most likes being first", function () {
        cy.get("button.toggle-detail-button").click({ multiple: true });
        cy.get(".blog-likes").then((elements) => {
          const likes = [];
          for (let i = 0; i < elements.length; i++)
            likes.push(Number(elements[i].textContent));

          expect(likes).to.have.ordered.members([6, 5, 3]);
        });
      });
    });
  });
});
