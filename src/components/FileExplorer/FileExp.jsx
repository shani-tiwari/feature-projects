import { useState } from "react";

export default function FileExplorer() {
  const [treeData, setTreeData] = useState(data);
  console.log(treeData, "treeData");

  return <div>
      {treeData.map((folderData, idx) => {
        return <div key={idx}>{folderData.name}</div>
      })}
  </div>;
}

function Tree() {  // have data here 
  return <div>
        {
        data.map((folderData, idx) => {
            return <div key={idx}>
                <div>
                    {folderData.name}
                </div>
            </div>
        })
        }
    </div>;
};


const data = [
    {
        id: 1,
        name: "galaxy",
        type: "folder",
        children: [
            {
                id: 2,
                name: "solar",
                type: "folder",
                children: [
                    {
                        id: 3,
                        name: "earth",
                        type: "file"
                    },
                    {
                        id: 4,
                        name: "mars",
                        type: "folder",
                        children: [
                            {
                                id: 5,
                                name: "olympus",
                                type: "file"
                            }
                        ]
                    }
                ]
            }
        ]
    }
]
