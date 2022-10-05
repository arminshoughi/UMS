import React from "react";
import ctl from "@netlify/classnames-template-literals";
import {
  ListboxButton,
  ListboxInput as ReachListboxInput,
  ListboxList as ReachListboxList,
  ListboxOption as ReachListboxOption,
  ListboxPopover as ReachListboxPopover,
  useListboxContext,
} from "@reach/listbox";
import "@reach/listbox/styles.css";
import { useTranslation } from "react-i18next";
import { HiCheck, HiChevronDown, HiFilter } from "react-icons/hi";

export function useDirection() {
  const { i18n } = useTranslation();
  return i18n.dir();
}

const listboxListCN = ctl(`
  max-h-60 overflow-auto rounded-sm focus:outline-none
  
`);

const selectorIconContainerCN = ctl(`
  absolute inset-y-0 flex items-center ps-2 pointer-events-none text-gray-500
  end-1
`);

const Listbox =
  React.forwardRef <
  HTMLInputElement >
  (({ children, chosen, styleListBox, ...rest }, ref) => {
    const [_, setSelected] = React.useState(false);

    return (
      <BaseListbox {...rest} ref={ref}>
        {
          //TODO: be optimized
        }
        <ListboxList style={styleListBox}>
          {chosen ? (
            <div className="flex items-center  justify-between">
              <ListboxOption
                value={String(null)}
                onClick={() => setSelected(true)}
                className="w-full"
              >
                انتخاب
              </ListboxOption>
            </div>
          ) : null}

          {children}
        </ListboxList>
      </BaseListbox>
    );
  });

const BaseListbox = React.forwardRef(
  (
    {
      children,
      isLoading,
      filterIcon,
      colorIconFilter,
      align,
      buttonProps,
      onChange,
      ...rest
    },
    ref
  ) => {
    const { t } = useTranslation();
    const dir = useDirection();

    return (
      <ReachListboxInput onChange={onChange} {...rest}>
        {({ valueLabel }) => (
          <>
            {isLoading ? (
              <ListboxInputSkeleton />
            ) : (
              <>
                <ListboxButton {...buttonProps} ref={ref}>
                  <span className="truncate">{valueLabel || t("choose")}</span>
                  <span className={selectorIconContainerCN}>
                    {filterIcon ? (
                      <HiFilter
                        className={`w-4 h-4 ${
                          colorIconFilter ? "text-[#FFB200]" : "text-silver-800"
                        }`}
                      />
                    ) : (
                      <HiChevronDown className="w-5 h-5" />
                    )}
                  </span>
                </ListboxButton>
                <ReachListboxPopover
                  //  position={
                  //   align === 'right'
                  //     ? (tr: any, pr: any) => ({
                  //         left: tr?.left + tr?.width - pr?.width,
                  //         top: tr?.bottom + 4 + window.scrollY,
                  //       })
                  //     : undefined
                  // }
                  position={(tr, pr) => ({
                    left: tr?.left + tr?.width - pr?.width,
                    top: tr?.bottom + window.scrollY,
                  })}
                  className="!bg-indigo-50 !shadow-lg !rounded-sm !mt-1 !z-[100] !p-0 focus-within:!outline-none"
                  dir={dir}
                >
                  {children}
                </ReachListboxPopover>
              </>
            )}
          </>
        )}
      </ReachListboxInput>
    );
  }
);

const ListboxList = React.forwardRef(({ children, style, ...props }, ref) => {
  const { selectedOptionRef, isExpanded, highlightedOptionRef } =
    useListboxContext();

  // Ensure that the selected item is in view when opening the popover
  React.useLayoutEffect(() => {
    if (selectedOptionRef.current && isExpanded) {
      selectedOptionRef.current.scrollIntoView({ block: "nearest" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  // Ensure that the highlighted item is in view at all times when using keyboard
  React.useLayoutEffect(() => {
    const ensureHighlightedInView = () => {
      if (highlightedOptionRef.current) {
        highlightedOptionRef.current.scrollIntoView({ block: "nearest" });
      }
    };

    window.addEventListener("keydown", ensureHighlightedInView);
    return () => {
      window.removeEventListener("keydown", ensureHighlightedInView);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ReachListboxList
      style={style}
      ref={ref}
      className={listboxListCN}
      {...props}
    >
      {children}
    </ReachListboxList>
  );
});

const ListboxOption = React.forwardRef(({ children, value, ...rest }, ref) => {
  const { value: v } = useListboxContext();

  return (
    <>
      <ReachListboxOption value={value} {...rest} ref={ref}>
        {children}
        {(value === "null" && v === "0") || value === v ? (
          <div className="absolute inset-y-0 flex items-center end-0 pe-2">
            <HiCheck className="w-5 h-5" />
          </div>
        ) : (
          ""
        )}
      </ReachListboxOption>
    </>
  );
});

function ListboxInputSkeleton() {
  return (
    <div className="h-9 w-full bg-gray-200 animate-pulse p-2">
      <div className="h-5 bg-gray-300 w-10/12 rounded-sm"></div>
      <div className={`${selectorIconContainerCN} animate-pulse`}>
        <HiChevronDown className="w-5 h-5" />
      </div>
    </div>
  );
}

export { BaseListbox, ListboxList, ListboxOption };
export default Listbox;
