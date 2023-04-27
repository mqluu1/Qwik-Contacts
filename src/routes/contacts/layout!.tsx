import {
  component$,
  Slot,
  useClientEffect$,
  useSignal,
} from "@builder.io/qwik";
import { RequestHandler } from "@builder.io/qwik-city";

export const onRequest: RequestHandler = async ({
  cookie,
  response,
  request,
}) => {
  if (!cookie.get("contact-login")) {
    throw response.redirect("/login/?redirect=" + request.url);
  }
};

export default component$(() => {
  return (
    <>
      <main>
        <h1>Contacts Demo</h1>
        <section>
          <Slot />
        </section>
      </main>
      <footer>
        <a href="https://www.builder.io/" target="_blank">
          Made with ♡ by Builder.io
        </a>
        <Clock />
      </footer>
    </>
  );
});

export const Clock = component$(() => {
  const timestamp = useSignal("...loading...");
  useClientEffect$(() => {
    function update() {
      timestamp.value = new Date().toLocaleTimeString();
    }
    update();
    setInterval(update, 1000);
  });
  return <div>{timestamp.value}</div>;
});