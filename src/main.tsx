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

function App() {
  return (
    <>
      <NavBar />
      <Background />
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/recruitment" component={RecruitmentPage} />
        <Route path="/calendar" component={CalendarPage} />
        <Route>
          <div style={{ textAlign: "center" }}>404 - Page not found</div>
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

render(<App />, document.getElementById("app")!);
