import React, { memo, forwardRef, type CSSProperties, ReactNode } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { fr } from "./fr";
import { cx } from "./tools/cx";
import { createComponentI18nApi } from "./i18n";
import { RegisteredLinkProps, getLink } from "./link";
import { useAnalyticsId } from "./tools/useAnalyticsId";

const DynamicLink = ({
    useReactLinkComponent,
    children,
    ...rest
}: {
    useReactLinkComponent: boolean;
    children: ReactNode;
}) => {
    const { Link } = getLink();
    return useReactLinkComponent ? <Link {...rest}>{children}</Link> : <a {...rest}>{children}</a>;
};

export type PaginationProps = {
    id?: string;
    className?: string;
    count: number;
    defaultPage?: number;
    classes?: Partial<Record<"root" | "list" | "link", string>>;
    style?: CSSProperties;
    showFirstLast?: boolean;
    getPageLinkProps: (pageNumber: number) => RegisteredLinkProps;
};

// naive page slicing
const getPaginationParts = ({ count, defaultPage }: { count: number; defaultPage: number }) => {
    const maxVisiblePages = 10;
    const slicesSize = 4;
    // first n pages
    if (count <= maxVisiblePages) {
        return Array.from({ length: count }, (_, v) => ({
            number: v + 1,
            active: defaultPage === v + 1
        }));
    }
    // last n pages
    if (defaultPage > count - maxVisiblePages) {
        return Array.from({ length: maxVisiblePages }, (_, v) => {
            const pageNumber = count - (maxVisiblePages - v) + 1;
            return {
                number: pageNumber,
                active: defaultPage === pageNumber
            };
        });
    }
    // slices
    return [
        ...Array.from({ length: slicesSize }, (_, v) => {
            if (defaultPage > slicesSize) {
                const pageNumber = v + defaultPage;
                return { number: pageNumber, active: defaultPage === pageNumber };
            }
            return { number: v + 1, active: defaultPage === v + 1 };
        }),
        { number: null, active: false },
        ...Array.from({ length: slicesSize }, (_, v) => {
            const pageNumber = count - (slicesSize - v) + 1;
            return {
                number: pageNumber,
                active: defaultPage === pageNumber
            };
        })
    ];
};

/** @see <https://components.react-dsapitech.codegouv.studio/?path=/docs/components-pagination> */
export const Pagination = memo(
    forwardRef<HTMLDivElement, PaginationProps>((props, ref) => {
        const {
            id: id_props,
            className,
            count,
            defaultPage = 1,
            showFirstLast = true,
            getPageLinkProps,
            classes = {},
            style,
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const id = useAnalyticsId({
            "defaultIdPrefix": "fr-pagination",
            "explicitlyProvidedId": id_props
        });

        const { t } = useTranslation();

        const { Link } = getLink();

        const parts = getPaginationParts({ count, defaultPage });

        const activePage = parts.find(part => part.active);
        const currentPage = activePage?.number;
        const isCurrentPageFirstPage = currentPage === 1;
        const isCurrentPageLastPage = currentPage === count;

        return (
            <nav
                id={id}
                role="navigation"
                className={cx(fr.cx("fr-pagination"), classes.root, className)}
                aria-label={t("aria-label")}
                style={style}
                ref={ref}
            >
                <ul className={cx(fr.cx("fr-pagination__list"), classes.list)}>
                    {showFirstLast && (
                        <li>
                            <DynamicLink
                                useReactLinkComponent={defaultPage > 1}
                                {...(count > 0 && defaultPage > 1 && getPageLinkProps(1))}
                                {...{
                                    className: cx(
                                        fr.cx("fr-pagination__link", "fr-pagination__link--first"),
                                        classes.link,
                                        getPageLinkProps(1).className
                                    ),
                                    "aria-disabled":
                                        count > 0 && isCurrentPageFirstPage ? true : undefined,
                                    role: "link"
                                }}
                            >
                                {t("first page")}
                            </DynamicLink>
                        </li>
                    )}
                    <li>
                        <DynamicLink
                            useReactLinkComponent={defaultPage > 1}
                            {...(defaultPage > 1 && getPageLinkProps(defaultPage - 1))}
                            {...{
                                className: cx(
                                    fr.cx(
                                        "fr-pagination__link",
                                        "fr-pagination__link--prev",
                                        "fr-pagination__link--lg-label"
                                    ),
                                    classes.link
                                ),
                                "aria-disabled": isCurrentPageFirstPage ? true : undefined,
                                role: "link"
                            }}
                        >
                            {t("previous page")}
                        </DynamicLink>
                    </li>
                    {parts.map(part => (
                        <li key={part.number}>
                            {part.number === null ? (
                                <a className={cx(fr.cx("fr-pagination__link"), classes.link)}>
                                    ...
                                </a>
                            ) : (
                                <Link
                                    className={cx(fr.cx("fr-pagination__link"), classes.link)}
                                    aria-current={part.active ? true : undefined}
                                    title={`Page ${part.number}`}
                                    {...getPageLinkProps(part.number)}
                                >
                                    {part.number}
                                </Link>
                            )}
                        </li>
                    ))}
                    <li>
                        <DynamicLink
                            useReactLinkComponent={defaultPage < count}
                            {...(defaultPage < count && getPageLinkProps(defaultPage + 1))}
                            {...{
                                className: cx(
                                    fr.cx(
                                        "fr-pagination__link",
                                        "fr-pagination__link--next",
                                        "fr-pagination__link--lg-label"
                                    ),
                                    classes.link
                                ),
                                "aria-disabled": isCurrentPageLastPage ? true : undefined,
                                role: "link"
                            }}
                        >
                            {t("next page")}
                        </DynamicLink>
                    </li>
                    {showFirstLast && (
                        <li>
                            <DynamicLink
                                useReactLinkComponent={defaultPage < count}
                                {...(defaultPage < count && getPageLinkProps(count))}
                                {...{
                                    className: cx(
                                        fr.cx("fr-pagination__link", "fr-pagination__link--last"),
                                        classes.link
                                    ),
                                    "aria-disabled": isCurrentPageLastPage ? true : undefined
                                }}
                            >
                                {t("last page")}
                            </DynamicLink>
                        </li>
                    )}
                </ul>
            </nav>
        );
    })
);

Pagination.displayName = symToStr({ Pagination });

const { useTranslation, addPaginationTranslations } = createComponentI18nApi({
    "componentName": symToStr({ Pagination }),
    "frMessages": {
        "first page": "Première page",
        "previous page": "Page précédente",
        "next page": "Page suivante",
        "last page": "Dernière page",
        "aria-label": "Pagination"
    }
});

addPaginationTranslations({
    "lang": "en",
    "messages": {
        "first page": "First page",
        "previous page": "Previous page",
        "next page": "Next page",
        "last page": "Last page",
        "aria-label": "Pagination"
    }
});

export { addPaginationTranslations };

export default Pagination;
