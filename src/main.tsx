// default import
import { render } from "preact";
import { Route, Switch } from "wouter";
import { useTranslation } from "react-i18next";

// components
import { NavBar } from "@/components/navBar";
import { Footer } from "@/components/footer";
import { Background } from "@/components/background";

// pages
import { HomePage } from "@/pages/Home/Home";
import { RecruitmentPage } from "@/pages/Recruitment/Recruitment";
import { CalendarPage } from "@/pages/Calendar/Calendar";

// styles
import "@/styles/shared.css";
import { fetchStateData } from "./utils/stateApi";

// i18n
import "@/utils/i18n";
import i18next, { rtlLanguages } from "@/utils/i18n";

function App() {
  fetchStateData();

  const { t } = useTranslation(["errors"]);

  return (
    <>
      <NavBar />
      <Background />
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/recruitment" component={RecruitmentPage} />
        <Route path="/calendar" component={CalendarPage} />
        <Route>
          <main>
            <section>
              <div class="text-center text-8xl font-bold">404 - {t("404")}</div>
            </section>
          </main>
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

document.body.setAttribute(
  "dir",
  rtlLanguages.includes(i18next.language) ? "rtl" : "ltr",
);

render(<App />, document.getElementById("app")!);
