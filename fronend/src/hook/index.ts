import React, { CSSProperties } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router'
import {
  PluginHook,
  Row,
  TableInstance,
  defaultColumn,
  useExpanded,
  useFilters,
  useFlexLayout,
  usePagination,
  useResizeColumns,
  useRowSelect,
  useRowState,
  useSortBy,
  useTable,
} from 'react-table'
import { GridProps, PaginatedGridProps } from '../components/Grid'
import { FONT_FAMILY } from '../constants/general'
import { useSelectedItem } from '../context/wrapperContext'
import { Languages } from '../interfaces'
import { DecodedToken } from '../interfaces/auth'
import { hasCompany } from '../utils'
import { getDecodedToken } from '../utils/get-decoded-token'
import { betweenDate, betweenPrice } from '../utils/grid'
import { isVisibleElement } from '../utils/is-visible-element'
import {
  useListModulePermissionUser,
  useModuleId,
  useRawServerMenu,
} from './general'

export function useDirection() {
  const { i18n } = useTranslation()
  return i18n.dir()
}

export function useLanguage(): Languages {
  const { i18n } = useTranslation()
  return i18n.language as Languages
}

export function useCompanyId() {
  const { pathname } = useLocation()
  const id = Number(pathname.split('/')[1])

  if (!hasCompany()) {
    return 0
  }

  if (isNaN(id)) {
    throw new Error('companyId is NaN, company id is missing in the URL')
  }

  return id
}

export function useWrapperGridRowProps() {
  const [, setSelectedItem] = useSelectedItem()

  const handleKeyUp = React.useCallback<
    React.KeyboardEventHandler<HTMLTableRowElement>
  >(e => {
    let active = document.activeElement
    if (active?.nodeName !== 'TR') {
      active = active?.closest('tr') as HTMLTableRowElement
    }

    if (e.ctrlKey && e.key === 'Enter') {
      const editButton = active.querySelector(
        'button[row-edit-button]'
      ) as HTMLAnchorElement
      if (editButton && isVisibleElement(editButton)) {
        editButton.click()
      }
    } else if (e.key === 'Enter') {
      const linkButton = active.querySelector(
        'a[row-link-button]'
      ) as HTMLAnchorElement
      if (linkButton && isVisibleElement(linkButton)) {
        linkButton.click()
      }
    } else if (e.key === 'Delete') {
      const removeButton = active.querySelector(
        'button[row-remove-button]'
      ) as HTMLButtonElement
      if (removeButton && isVisibleElement(removeButton)) {
        removeButton.click()
      }
    }
  }, [])

  React.useLayoutEffect(() => {
    const ensureSelectedInView = (e: KeyboardEvent) => {
      let active = document.activeElement
      if (active?.nodeName !== 'TR') {
        active = active?.closest('tr') as HTMLTableRowElement
      }

      if (e.key === 'ArrowDown' && active?.nextSibling) {
        // @ts-ignore
        active.nextSibling.focus()
      }
      if (e.key === 'ArrowUp' && active?.previousSibling) {
        // @ts-ignore
        active.previousSibling.focus()
      }
    }

    window.addEventListener('keydown', ensureSelectedInView)
    return () => {
      window.removeEventListener('keydown', ensureSelectedInView)
    }
  }, [])

  return React.useCallback(
    (row: Row) =>
      ({
        onClick: () => {
          setSelectedItem(row.original)
        },
        onFocus: () => {
          setSelectedItem(row.original)
        },
        onKeyUp: handleKeyUp,
      } as React.HTMLAttributes<HTMLTableRowElement>),
    [handleKeyUp, setSelectedItem]
  )
}

export function useApplyUserSettings() {
  const { i18n } = useTranslation()

  React.useEffect(() => {
    const token = getDecodedToken()
    document.documentElement.style.fontFamily = FONT_FAMILY[token?.font_family!]
    document.documentElement.style.fontSize = `${token?.font_size}rem`
    i18n.changeLanguage(token?.language.code.toLowerCase())
  }, [])
}

interface UseGridReturn {
  decodedToken: DecodedToken
  table: TableInstance<any>
  selectedRowRef: React.RefObject<any>
}

export function useGrid(
  props: PaginatedGridProps,
  ...extraPlugins: PluginHook<any>[]
): UseGridReturn
export function useGrid(
  props: GridProps,
  ...extraPlugins: PluginHook<any>[]
): UseGridReturn
export function useGrid(
  {
    columns,
    data,
    initialFilters,
    paginated,
    manualFilters,
    disableFilters,
    count,
    dataUpdater,
    autoResetFilters,
    autoResetPage,
    tableOptions,
    flexbox,
    onFetchData,
    hiddenColumns,
  }: any,
  ...extraPlugins: any
) {
  const decodedToken = React.useMemo(() => getDecodedToken(), [])
  const selectedRowRef = React.useRef<HTMLTableSectionElement>(null)

  const table = useTable<{
    styles?: CSSProperties
    cellStyles?: CSSProperties
  }>(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: 15,
        filters: initialFilters
          ? Object.entries(initialFilters).map(([key, value]) => ({
              id: key,
              value,
            }))
          : [],
      },
      autoResetPage: !paginated,
      manualPagination: true,
      pageCount: count,
      disableFilters,
      manualFilters,
      filterTypes: {
        betweenDate: betweenDate,
        betweenPrice: betweenPrice,
      },
      dataUpdater,
      defaultColumn: {
        ...defaultColumn,
      },
      autoResetFilters,
      ...tableOptions,
    },
    useResizeColumns,
    flexbox ? useFlexLayout : () => undefined,
    useRowState,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    ...extraPlugins
  )
  const { pageIndex, pageSize, filters } = table.state
  const { setHiddenColumns } = table

  React.useEffect(() => {
    if (onFetchData) {
      onFetchData({ pageIndex, pageSize, filters })
    }
  }, [pageIndex, pageSize, filters, onFetchData])

  React.useEffect(() => {
    hiddenColumns &&
      setHiddenColumns(() => {
        return hiddenColumns
      })
  }, [hiddenColumns, setHiddenColumns])

  React.useEffect(() => {
    columns.forEach((c: any) =>
      c.hidden ? setHiddenColumns(hiddenCols => [...hiddenCols, c.id]) : null
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns])

  React.useLayoutEffect(() => {
    ;(
      selectedRowRef.current?.querySelector('tr') as HTMLTableRowElement | null
    )?.focus()
  }, [])

  React.useLayoutEffect(() => {
    const ensureSelectedInView = (e: KeyboardEvent) => {
      let active = document.activeElement
      if (active?.nodeName !== 'TR') {
        active = active?.closest('tr') as HTMLTableRowElement
      }

      if (e.key === 'ArrowDown' && active?.nextSibling) {
        // @ts-ignore
        active.nextSibling.focus()
      }
      if (e.key === 'ArrowUp' && active?.previousSibling) {
        // @ts-ignore
        active.previousSibling.focus()
      }
    }

    window.addEventListener('keydown', ensureSelectedInView)
    return () => {
      window.removeEventListener('keydown', ensureSelectedInView)
    }
  }, [])

  return {
    selectedRowRef,
    decodedToken,
    table,
  }
}

export function useModulePermissionsUserItem(entityTypeKeyManual?: string) {
  const location = useLocation()

  const [entityTypeKey, setEntityTypeKey] = React.useState<
    null | string | undefined
  >('')

  const moduleId = useModuleId()

  const { data: itemMenus } = useRawServerMenu()

  const modulesPermissionsUser = useListModulePermissionUser(moduleId)
  const modulesPermissionsUserStore = useListModulePermissionUser(4)
  const modulesPermissionsUserPm = useListModulePermissionUser(5)

  const modulesPermissionsUsersList =
    moduleId === 2
      ? modulesPermissionsUser?.concat(
          modulesPermissionsUserStore!,
          modulesPermissionsUserPm!
        )
      : modulesPermissionsUser

  let pathMainSplit = location.pathname.split('/')
  pathMainSplit.shift()
  pathMainSplit.pop()
  if (pathMainSplit[0] !== 'general') pathMainSplit.shift()

  let pathMainJoin = '/' + pathMainSplit.join('/')

  React.useEffect(() => {
    itemMenus?.some(item => {
      if (item.link === pathMainJoin) {
        setEntityTypeKey(item.entity_type_key)
        return true
      }
    })
  }, [itemMenus, pathMainJoin])

  return modulesPermissionsUsersList?.find(itemPermission => {
    if (
      itemPermission?.entity_type_key === entityTypeKey ||
      itemPermission?.entity_type_key === entityTypeKeyManual
    ) {
      return itemPermission
    }
  })
}

export function useIsValidatingAndSubmitting(methods: UseFormReturn<any>) {
  const [isValidatingAndSubmitting, setIsValidatingAndSubmitting] =
    React.useState(false)
  const {
    formState: { isValidating },
  } = methods

  React.useEffect(() => {
    document
      .querySelector('form[aria-label="Voucher Form"] button[type="submit"]')
      ?.addEventListener('click', () => {
        if (isValidating) {
          setIsValidatingAndSubmitting(true)
        }
      })
  }, [])

  React.useEffect(() => {
    if (!isValidating) {
      setIsValidatingAndSubmitting(false)
    }
  }, [isValidating])

  return isValidatingAndSubmitting
}
