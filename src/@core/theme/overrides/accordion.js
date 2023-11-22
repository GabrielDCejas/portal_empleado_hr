// ** Hook Import
import { useSettings } from "../../hooks/useSettings"

const Accordion = () => {
  // Hook & Var
  const { settings } = useSettings()
  const { skin } = settings

  return {
    MuiAccordion: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          boxShadow: theme.shadows[skin === 'bordered' ? 0 : 1],
          ...(skin === 'bordered' && {
            '&:before': { display: 'none' },
            borderLeft: `1px solid ${theme.palette.divider}`,
            borderRight: `1px solid ${theme.palette.divider}`,
            borderBottom: `1px solid ${theme.palette.divider}`,
            '&:first-of-type': { borderTop: `1px solid ${theme.palette.divider}` }
          }),
          ...(ownerState.disabled === true && {
            backgroundColor: `rgba(${theme.palette.customColors.main}, 0.12)`
          }),
          ...(ownerState.expanded === true && {
            boxShadow: theme.shadows[skin === 'bordered' ? 0 : 3],
            '&:not(:first-of-type)': { borderTop: `1px solid ${theme.palette.divider}` },
            ...(skin === 'bordered' && {
              '& + .MuiAccordion-root': { borderTop: `1px solid ${theme.palette.divider}` }
            })
          })
        })
      }
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          borderRadius: 'inherit',
          padding: `0 ${theme.spacing(5)}`,
          ...(ownerState.expanded === true && {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0
          }),
          '& + .MuiCollapse-root': {
            '& .MuiAccordionDetails-root:first-child': {
              paddingTop: 0
            }
          }
        }),
        content: ({ theme }) => ({
          margin: `${theme.spacing(2.5)} 0`
        }),
        expandIconWrapper: ({ theme }) => ({
          color: theme.palette.text.secondary
        })
      }
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(5),
          '& + .MuiAccordionDetails-root': {
            paddingTop: 0
          }
        })
      }
    }
  }
}

export default Accordion
