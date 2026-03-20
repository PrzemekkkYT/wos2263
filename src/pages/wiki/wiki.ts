// css import
import "../../styles/shared.css";
import "./style.css";

// default import
import { Marked } from "marked";
import DOMPurify from "dompurify";

const urlParams = new URLSearchParams(window.location.search);

const articleContainer = document.getElementById("article_container");

const markdownFileContent = (await import(`./test.md?raw`)).default;

const renderer = new Marked();

if (articleContainer) {
  articleContainer.innerHTML =
    DOMPurify.sanitize(renderer.parse(markdownFileContent) as string) ?? "";
}
