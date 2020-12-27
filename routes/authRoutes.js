const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: "/api/current_user",
      failureRedirect: "/login",
    })
  );

  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", { scope: ["email"] })
  );

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
      successRedirect: "/api/current_user",
      failureRedirect: "/login",
    })
  );

  app.get("/auth/twitter", passport.authenticate("twitter"));

  app.get(
    "/auth/twitter/callback",
    passport.authenticate("twitter", {
      successRedirect: "/api/current_user",
      failureRedirect: "/login",
    })
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
