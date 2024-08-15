import type { Component } from "solid-js";
import type { TProtectedRoutePage } from "~/lib/types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { A, useLocation } from "@solidjs/router";
import { Button } from "~/components/ui/button";
import { equalUrls } from "~/lib/utils";

const NavBarButton: Component<{ option: TProtectedRoutePage }> = ({
  option,
}) => {
  const location = useLocation();
  return (
    <Tooltip>
      <TooltipTrigger>
        <A href={option.url}>
          <Button
            class="rounded-full size-12 mx-2"
            variant={
              equalUrls(location.pathname, option.url) ? "default" : "secondary"
            }
          >
            {<option.icon size={18} />}
          </Button>
        </A>
      </TooltipTrigger>
      <TooltipContent>{option.tooltip}</TooltipContent>
    </Tooltip>
  );
};
export default NavBarButton;
