import clsx from "clsx";
import { createElement, forwardRef } from "react";
import IconProps from "./interface";

export function IconLoading(
  { title, titleId, className, ...props }: IconProps,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  svgRef: any,
) {
  return /*#__PURE__*/ createElement(
    "svg",
    Object.assign(
      {
        "aria-hidden": "true",
        "aria-labelledby": titleId,
        "data-testid": "icon-loading-spinner",
        fill: "none",
        ref: svgRef,
        viewBox: "0 0 24 24",
        xmlns: "http://www.w3.org/2000/svg",
        className: clsx("animate-spin relative", className),
      },
      props,
    ),
    title
      ? /*#__PURE__*/ createElement(
          "title",
          {
            id: titleId,
          },
          title,
        )
      : null,
    /*#__PURE__*/ createElement("circle", {
      className: "absolute left-1/2 opacity-25 top-1/2",
      cx: "12",
      cy: "12",
      r: "10",
      stroke: "currentColor",
      strokeWidth: "4",
    }),
    /*#__PURE__*/ createElement("path", {
      className: "opacity-75",
      fill: "currentColor",
      d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",
    }),
  );
}

export const ForwardRef = forwardRef(IconLoading);
