import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { PageHeadingProps } from "./interface";
import { PageHeading } from "./page-heading";

type PageHeadingTestProps = React.ComponentPropsWithoutRef<"div"> &
  PageHeadingProps;

const defaultProps = {
  title: "Test Page Title",
  className: "custom-class",
} satisfies Partial<PageHeadingTestProps>;

const setup = (props: Partial<PageHeadingTestProps> = {}) => {
  const propsWithDefault = { ...defaultProps, ...props };
  return render(<PageHeading {...propsWithDefault} />);
};

const getOuterContainer = () =>
  screen.getByRole("heading").parentElement?.parentElement;
const getInnerContainer = () => screen.getByRole("heading").parentElement;

describe("The PageHeading component", () => {
  describe("displaying the component properties", () => {
    test("displaying the component title", () => {
      setup();

      expect(
        screen.getByRole("heading", { level: 1, name: defaultProps.title }),
      ).toBeInTheDocument();
    });

    test("applying custom className", () => {
      const customClass = "my-custom-class";
      setup({ className: customClass });

      expect(getOuterContainer()).toHaveClass(customClass);
    });
  });

  describe("rendering children content", () => {
    test("displaying children when provided", () => {
      setup({
        children: (
          <div data-testid="child-content">Additional content below title</div>
        ),
      });

      expect(screen.getByTestId("child-content")).toBeInTheDocument();
    });

    test("applying flex layout when children are present", () => {
      setup({ children: <div>Child content</div> });

      expect(getInnerContainer()).toHaveClass("flex", "flex-col", "gap-4");
    });
  });

  describe("rendering action elements", () => {
    test("displaying action when provided", () => {
      const actionText = "Action Button";
      setup({ action: <button>{actionText}</button> });

      expect(
        screen.getByRole("button", { name: actionText }),
      ).toBeInTheDocument();
    });

    test("not displaying action when not provided", () => {
      setup({ action: undefined });

      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    test("applying flex layout when action is present", () => {
      setup({ action: <button>Action</button> });

      expect(getOuterContainer()).toHaveClass(
        "flex",
        "gap-4",
        "justify-between",
        "items-center",
      );
    });

    test("not applying flex layout when action is not present", () => {
      setup({ action: undefined });

      expect(getOuterContainer()).not.toHaveClass(
        "flex",
        "gap-4",
        "justify-between",
        "items-center",
      );
    });
  });

  describe("complex scenarios", () => {
    test("rendering with all props simultaneously", () => {
      const actionText = "Save";
      const childText = "Description text";
      const customClass = "special-class";

      setup({
        title: "Complete Page",
        action: <button>{actionText}</button>,
        children: <div>{childText}</div>,
        className: customClass,
      });

      expect(screen.getByRole("heading")).toHaveTextContent("Complete Page");
      expect(
        screen.getByRole("button", { name: actionText }),
      ).toBeInTheDocument();
      expect(screen.getByText(childText)).toBeInTheDocument();

      expect(getOuterContainer()).toHaveClass(
        customClass,
        "flex",
        "gap-4",
        "justify-between",
        "items-center",
      );
    });

    test("rendering with only required props", () => {
      setup({ title: "Minimal Title" });

      expect(screen.getByRole("heading")).toHaveTextContent("Minimal Title");

      expect(getOuterContainer()).not.toHaveClass(
        "flex",
        "gap-4",
        "justify-between",
        "items-center",
      );
      expect(getInnerContainer()).not.toHaveClass("flex", "flex-col", "gap-4");
    });
  });
});
