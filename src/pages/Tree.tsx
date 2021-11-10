import React, { useEffect } from 'react';
import { userService } from '../services/UserService';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

interface TreeModel {
    title: string;
    path: string;
    type: string;
    nodes: Array<any>;
}
const Tree = () => {
    const [menus, setMenu] = React.useState<any>([]);

    useEffect(() => {
        fetchMenus(); // call the fetch menu
    }, []);

    /**
     * @fetchMenus - here we can fetch the menus
     */
    const fetchMenus = async () => {
        const resp = await userService.hitApi({}, 'menu.json', 'GET');
        if (resp) {
            setMenu(resp);
        }
    }

    const printNameAndPath = (node: TreeModel) => {
        console.log('name', node.title);
        console.log('path', node.path);
    }

    const drawTree = (nodes: Array<TreeModel>, childrenName: string = '') => {
        return nodes?.map((node: any, index: number) => {
            return (node?.nodes?.length > 0) ? <TreeItem key={index} onClick={() => { printNameAndPath(node) }} nodeId={`${index} ${childrenName}`} label={`${node.title}`}>
                <>
                    {(node?.nodes?.length > 0) ? drawTree(node.nodes, node.title + childrenName) : <></>}
                </>
            </TreeItem> : <TreeItem key={index} onClick={() => { printNameAndPath(node) }} nodeId={`${index} ${childrenName}`} label={`${node.title}`} />;
        });
    }

    return (
        <>
            <TreeView
                aria-label="multi-select"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                multiSelect
                sx={{ flexGrow: 1 }}
            >
                <>{drawTree(menus)} </>
            </TreeView>

        </>
    )
}
export default Tree;