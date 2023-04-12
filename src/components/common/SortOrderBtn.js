import { useContext } from "react";
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import IconButton from '@mui/material/IconButton';
import SortContext from "../../context/sort";

export default function SortOrderBtn() {
    const { sortOrder, setSortOrder } = useContext(SortContext);

    return (
        <IconButton
            onClick={() => {
                setSortOrder(sortOrder === 1 ? -1 : 1)
            }}
            size="small"
            style={{
                '&:hover': {
                    coursor: 'pointer',
                }
            }}
        >{sortOrder === 1 ?
            <NorthIcon fontSize='2' /> :
            <SouthIcon fontSize='2' />}
        </IconButton>
    );
}

