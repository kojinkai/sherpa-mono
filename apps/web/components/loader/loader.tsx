import clsx from "clsx";
import { IconLoading } from "..";
import LoaderProps from "./interface";

export function Loader({ fullScreen = true }: LoaderProps) {
  return (
    <div
      className={clsx({
        "h-[calc(100vh-156px)]": fullScreen,
      })}
    >
      <div
        className={clsx("flex", "flex-col", "items-center", "mx-auto", {
          "h-full": fullScreen,
          "max-w-7xl": fullScreen,
          "py-6": !fullScreen,
        })}
      >
        <div
          className="flex m-auto"
          data-testid="loading-spinner"
          role="alert"
          title="loading"
        >
          <IconLoading className="w-6" />
        </div>
      </div>
    </div>
  );
}
