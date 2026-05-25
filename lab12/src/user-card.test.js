import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import "../src/components/user-card.js";


describe("UserCard", () => {
  let el;

  beforeEach(() => {
    el = document.createElement("user-card");
    el.setAttribute("name", "Alonso");
    el.setAttribute("role", "Profesor");
    document.body.append(el);
  });

  afterEach(() => el.remove());

  it("se registra como custom element", () => {
    expect(customElements.get("user-card")).toBeDefined();
  });

  it("renderiza nombre y rol", async () => {
    await Promise.resolve();
    expect(el.shadowRoot.querySelector("h3").textContent).toBe("Alonso");
    expect(el.shadowRoot.querySelector("p").textContent).toBe("Profesor");
  });

  it("dispara evento user:greet al pulsar el botón", async () => {
    await Promise.resolve();
    const handler = vi.fn();
    el.addEventListener("user:greet", handler);
    el.shadowRoot.querySelector("button").click();
    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].detail.name).toBe("Alonso");
  });
});
