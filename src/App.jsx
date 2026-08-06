import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Generate from "./pages/Generate";
import Explore from "./pages/Explore";
import Learn from "./pages/Learn";
import WhatAreAffirmations from "./pages/learn/WhatAreAffirmations";
import HowToWrite from "./pages/learn/HowToWrite";
import MirrorWork from "./pages/learn/MirrorWork";
import SleepAffirmations from "./pages/learn/SleepAffirmations";
import ExerciseYoga from "./pages/learn/ExerciseYoga";
import AffirmationsInSport from "./pages/learn/AffirmationsInSport";
import MorningRoutines from "./pages/learn/MorningRoutines";
import AnxietyAffirmations from "./pages/learn/AnxietyAffirmations";
import ConfidenceAffirmations from "./pages/learn/ConfidenceAffirmations";
import CommonMistakes from "./pages/learn/CommonMistakes";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="generate" element={<Generate />} />
          <Route path="explore" element={<Explore />} />
          <Route path="learn" element={<Learn />} />
          <Route path="learn/what-are-affirmations" element={<WhatAreAffirmations />} />
          <Route path="learn/how-to-write-your-own" element={<HowToWrite />} />
          <Route path="learn/mirror-work" element={<MirrorWork />} />
          <Route path="learn/affirmations-while-you-sleep" element={<SleepAffirmations />} />
          <Route path="learn/affirmations-exercise-yoga" element={<ExerciseYoga />} />
          <Route path="learn/affirmations-in-sport" element={<AffirmationsInSport />} />
          <Route path="learn/morning-affirmation-routines" element={<MorningRoutines />} />
          <Route path="learn/affirmations-for-anxiety" element={<AnxietyAffirmations />} />
          <Route path="learn/affirmations-for-confidence" element={<ConfidenceAffirmations />} />
          <Route path="learn/common-affirmation-mistakes" element={<CommonMistakes />} />
          <Route path="about" element={<About />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
