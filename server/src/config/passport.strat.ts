import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { AccountModel } from "@/models/user.model";

type Done = (error: any, user?: Express.User | false, info?: any) => void;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email: string, password: string, done: Done) => {
      try {
        const user = await AccountModel.findOne({ email });
        if (!user) throw new Error();
        const isCorrect = await user.validatePassword(password, email);
        console.log(isCorrect);
        if (isCorrect) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, (user as any)._id);
});

passport.deserializeUser(async (id: Express.User, done) => {
  try {
    const user = await AccountModel.findById(id, {
      email: 1,
      first_name: 1,
      last_name: 1,
      phone_number: 1,
      role: 1,
      createdAt: 1,
    });
    if (!user) throw new Error("User not found");
    done(null, user);
  } catch (err) {
    done(err);
  }
});
