import React, { lazy, Suspense,useState } from "react";
import Progress from "./components/Progress";
import Header from "./components/Header";
import { BrowserRouter,Switch,Route } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});
export default () => {
  const [isSignedIn,setIsSignedIn]=useState(false)
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Suspense fallback={<Progress />}>
          <Header isSignedIn={isSignedIn} onSignOut={()=>setIsSignedIn(false)}/>
            <Switch>
              <Route path="/auth" component={AuthLazy}>
                <AuthLazy onSignIn={()=>setIsSignedIn(true)}></AuthLazy>
              </Route>
              <Route path="/" component={MarketingLazy} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};
