// default import
import { render } from "preact";
import { Route, Switch } from "wouter";

// components
import { NavBar } from "@/components/navBar";
import { Footer } from "@/components/footer";
import { Background } from "@/components/background";

// pages
import { HomePage } from "@/pages/Home/Home";
import { RecruitmentPage } from "@/pages/Recruitment";
import { CalendarPage } from "@/pages/Calendar/Calendar";

// styles
import "@/styles/shared.css";
import { fetchStateData } from "./utils/stateApi";

function App() {
  fetchStateData();

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
              <div class="text-center text-8xl font-bold">
                404 - Page not found
              </div>
            </section>
          </main>
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

render(<App />, document.getElementById("app")!);
