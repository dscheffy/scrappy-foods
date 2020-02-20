import { mount } from "enzyme";
import { Component, h } from "preact";
import { Link } from "preact-router/match";
import Header from "../components/header";

describe("Header", () => {
    const context = mount(<Header />);

    it("should be titled Scrappy Foods!", () => {
        expect(context.find("h1").text()).toBe("Scrappy Foods!");
    });
    it("should have 2 nav items (when not logged in)", () => {
        console.log(context.debug())
        expect(context.find("a").length).toBe(2);
    });
});
