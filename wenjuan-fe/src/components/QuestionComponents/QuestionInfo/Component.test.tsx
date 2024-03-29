import React from "react";
import Component from "./Component";
import { render, screen } from "@testing-library/react";

test("默认属性", () => {
	render(<Component />);
	const h = screen.getByText("问卷标题");
	expect(h).toBeInTheDocument();
});

test("传入属性", () => {
	render(<Component title="hello" desc="world" />);
	const t = screen.getByText("hello");
	expect(t).toBeInTheDocument();
	const d = screen.getByText("world");
	expect(d).toBeInTheDocument();
});

test("多行文字", () => {
	render(<Component desc={"a\nb\nc"} />);
	const span = screen.getByText("a");
	expect(span).toBeInTheDocument();
	expect(span).toHaveTextContent("a");
	expect(span).not.toHaveTextContent("ab");
});
