import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import routes from "./config";
import { Styles } from "../styles/styles";

const Router = () => {
  return (
    <Suspense fallback={null}>
      <Styles />
      <Header />
      <Switch>
        {routes.map((routeItem) => (
          <Route
            key={routeItem.component}
            path={routeItem.path}
            exact={routeItem.exact}
            component={lazy(
              () => import(/* @vite-ignore */ `../pages/${routeItem.component}`)
            )}
          />
        ))}
      </Switch>
      <Footer />
    </Suspense>
  );
};

export default Router;
