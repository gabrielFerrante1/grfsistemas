import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab'; 
import { InfoDeveloper } from './InfoDeveloper';
import {  System } from '../../../types/System';
import { useTranslation } from 'react-i18next';
import { Description } from './Description';
import { Comment } from './Comment';  


interface StyledTabProps {
    label: string;
  }

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
        <div
            style={{
              borderTop:'1px solid var(--secondary600)', 
              margin:'-1px 12px' 
            }}
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                children
            )}
        </div>
    );
}
  
function a11yProps(index: number) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const AntTabs = styled(Tabs)({
    padding:0,
    '& .MuiTabs-indicator': {
        backgroundColor: 'var(--primary)',
    },
});

const AntTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({  
    textTransform: 'none',
    minWidth: 0,
    [theme.breakpoints.up('sm')]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    color: 'var(--colorText)',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: 'var(--secondary300)',
      opacity: 1,
    },
    '&.Mui-selected': {
      color: 'var(--secondary600)',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'transparent',
    } 
  }),
); 

type Props = {
  data: System
}

export const SystemTabs = ({data}: Props)  => { 
  const {t} = useTranslation();

  const [value, setValue] = React.useState(0); 

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
      <> 
          <AntTabs selectionFollowsFocus value={value} onChange={handleChange}  >
            <AntTab label={t('COMMENTS')} {...a11yProps(0)}/>
            <AntTab label={t('DESCRIPTION')} {...a11yProps(1)} />
            <AntTab label={t('DEVELOPER_INFORMATION')} {...a11yProps(2)} />
          </AntTabs> 
      
          <TabPanel value={value} index={0}>
              <Comment  
              />
          </TabPanel>

          <TabPanel value={value} index={1}>
              <Description
                description={data.description}
              />
          </TabPanel>

          <TabPanel value={value} index={2}>
              <InfoDeveloper
                infoCompanie={data.companie}
              />
          </TabPanel>
      </>  
  );
}
