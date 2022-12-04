import React, { useEffect, useState } from "react";
import "../../styles/AdminPage/AdminPageCenter.css";
import AdminPageMain from "./AdminPageMain";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const AdminPageCenter = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [centerData, setCenterData] = useState([{}]);
  const [centerAccessedUser, setCenterAccessedUser] = useState();
  const [adminName, setAdminName] = useState("김찬진");
  const [adminJob, setAdminJob] = useState("AI 관리자");

  // headerName <- 테이블 헤더에 보여줄 내용
  // filed <- rowData 정보
  // headerCheckboxSelection <- 생성일시 헤더에 체크박스 생성
  // checkboxSelection <- rowData부분에도 체크박스 생성
  // pinned <- pinned: 'left'로 작성하면 좌측으로
  // width <- width값 조정

  const [columnDefs] = useState([
    {
      headerName: "센터이름",
      field: "centerName",
      headerCheckboxSelection: true,
      checkboxSelection: true,
      sortable: true,
      width: 250,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "센터주소",
      field: "centerAddress",
      sortable: true,
      width: 550,
    },
    { headerName: "인증코드", field: "centerAccess", sortable: true },
    { headerName: "전화번호", field: "centerPhone", sortable: true },
    { headerName: "센터회원", field: "centerUser", sortable: true },
    { headerName: "사업자등록번호", field: "centerID", sortable: true },
  ]);

  const defaultColDef = {
    resizable: true,
  };

  useEffect(() => {
    axios.post("http://localhost:8008/admincenter").then((res) => {
      setCenterData(res.data);
    });
  }, []);
  console.log(centerData);
  return (
    <div className="AdminPageCenter_top_div">
      <div className="AdminPageCenter_sidebar">
        <AdminPageMain />
      </div>
      <div className="ag-theme-alpine">
        <AgGridReact
          rowData={centerData.map((list) => {
            return {
              centerName: list.CENTER_NAME,
              centerAddress: list.CENTER_ADRESS,
              centerAccess: list.CENTER_ACCESS_CODE,
              centerPhone: list.CENTER_TEL,
              centerUser: `${list.USER_COUNT}명`,
              centerID: list.CENTER_ID,
            };
          })} // 테이블 데이터
          columnDefs={columnDefs} // 헤더데이터
          defaultColDef={defaultColDef}
          animateRows={true} // 행 애니메이션
          suppressRowClickSelection={true} // true -> 클릭 시 행이 선택안됌
          rowSelection={"multiple"} // 여러행 선택
          enableCellTextSelection={true} // 그리드가 일반 테이블인 것처럼 드래그시 일반 텍스트 선택
        ></AgGridReact>
      </div>
    </div>
  );
};

export default AdminPageCenter;
