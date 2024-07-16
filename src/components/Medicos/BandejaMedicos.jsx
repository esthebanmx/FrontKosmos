import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Divider,
  Dropdown,
  Form,
  Input,
  Row,
  Table,
  Typography,
} from "antd";
import { DownloadOutlined, EyeOutlined, DownOutlined } from "@ant-design/icons";
import { Breadcrumbs } from "../Generales/Breadcrumbs/Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../../reducers/globalSlice";
import { totalBandeja } from "../../utils/totalTabla";
import { dataMedicos } from "../../data/dataFormato";

function BandejaMedicos() {
  const [formConsultaMedicos] = Form.useForm();
  //const dispatch = useDispatch();

  const { Search } = Input;
  const { Paragraph } = Typography;
  const tituloModulo = "Bandeja de Medicos";
  const breadcrumbs = [tituloModulo];

  const [dataTable, setDataTable] = useState();
  const [totalTabla, setTotalTabla] = useState();

  const [origRequest, setOrigRequest] = useState();

  const [muestraResultados, setMuestraResultados] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [registro, setRegistro] = useState([]);
  const [mostrarDetalle, setMostrarDetalle] = useState(false);
  const [mostrarModalMultiple, setMostrarModalMultiple] = useState(false);
  const [tituloModal, setTituloModal] = useState(false);
  const [accionModal, setAccionModal] = useState([]);

  //almacena los folios de los expedientes cerrados yjls
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [items, setItems] = useState();

  const editar = (record) => {
    const elmt = {
      label: (
        <Button
          type="link"
          size="small"
          //disabled={!permisoCerrarExp}
          onClick={() => {
            //setAccionExp('cerrar');
            //setExpedAccion(record?.id_expediente);
            //setExpedAccionFechaApertura(record?.fecha_apertura);
            //setModalAccion(true);
          }}
        >
          Editar
        </Button>
      ),
      key: "1",
    };
    return elmt;
  };

  const borrar = (record) => {
    const elmt = {
      label: (
        <Button
          type="link"
          size="small"
          //disabled={!permisoRetenerExp}
          onClick={() => {
            // setRegistro(record);
            // setMostrarModalMultiple(true);
            // setTituloModal('Concluir solicitud de préstamo');
            // setAccionModal({ accion: 4, descripcion: 'Concluir' });
          }}
        >
          Borrar
        </Button>
      ),
      key: "2",
    };
    return elmt;
  };  

  const crearMenu = (record) => {
    let nuevosItems = [];
    
    nuevosItems.push(editar(record));
    nuevosItems.push(borrar(record));    

    setItems(nuevosItems);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  //REVISAR SI SE PUEDE MANDAR A UTILS Y UTILIZAR DESDE AHI
  const formatearFecha = (fecha) => {
    const formateada = fecha.split("T")[0];
    return formateada;
  };

  const columns = [
    {
      title: "Nombre Completo",
      width: 280,
      render: (_, record) => (
        <>
          <Row>
            <span>
              {record?.nombres + ' '+ record?.apellido_paterno + ' '+ record?.apellido_materno}
            </span>
          </Row>          
        </>
      ),
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          String(record?.nombres)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record?.apellido_paterno)
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      },
    },
    {
      title: "Especialidad",
      width: 280,
      render: (_, record) => (
        <>
          <Row>
            <span>              
              {record?.especialidad}
            </span>
          </Row>          
        </>
      ),
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          String(record?.especialidad)
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      },
    },
    {
      title: "Acciones",
      width: 150,
      fixed: "right",
      render: (_, record) => (
        <>
          <Button
            size="small"
            type="link"
            icon={<EyeOutlined />}
            onClick={() => {
              //setRegistro(record);
              //setMostrarDetalle(true);
            }}
          >
            Ver detalle
          </Button>

          <div>
            <Dropdown
              menu={{ items }}
              trigger={["click"]}
              onClick={() => crearMenu(record)}
            >
              <Button
                type="link"
                size="small"
                // onClick={() => console.log(record)}
              >
                Más acciones
                <DownOutlined />
              </Button>
            </Dropdown>
          </div>
        </>
      ),
    },
  ];

  const limpiar = () => {
    setMuestraResultados(false);
    formConsultaMedicos.resetFields();
  };

  const buscarMedicos = async (values) => {
    console.log(values);
    console.log(dataMedicos);
    //dispatch(setIsLoading(true));
    //TODO: AQUI VA LA LOGICA PARA CONSULTA
    setDataTable(dataMedicos);
    setTotalTabla(dataMedicos.length);
    setMuestraResultados(true);
  };

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <div className="main-container">
        <Row gutter={[16, 16]} justify="space-between" align="top">
          <Col
            xs={{ order: 2, span: 24 }}
            sm={{ order: 2, span: 24 }}
            md={{ order: 1, span: 19 }}
            lg={{ order: 1, span: 19 }}
            xl={{ order: 1, span: 20 }}
            xxl={{ order: 1, span: 21 }}
          >
            <h1>{tituloModulo}</h1>
          </Col>
        </Row>
        <div>
          <p>Consulta y da de alta médicos en este modulo.</p>
          <Form
            form={formConsultaMedicos}
            layout="vertical"
            onFinish={buscarMedicos}
          >
            <Row gutter={[16, 8]}>
              <Col span={2}></Col>
              <Col span={10}>
                <Form.Item label="Nombre del Médico" name="nombreMedico">
                  <Input placeholder="Ingresa el nombre o nombres" />
                </Form.Item>
                <Form.Item
                  label="Especialidad del Médico"
                  name="especialidadMedico"
                >
                  <Input placeholder="Ingresa la especialidad del Médico" />
                </Form.Item>
              </Col>
              <Col span={10}></Col>
            </Row>
            <Row gutter={[16, 16]} justify="center">
              <Col>
                <Button type="default" size="large" onClick={limpiar}>
                  Limpiar
                </Button>
              </Col>
              <Col>
                <Button type="primary" size="large" htmlType="submit">
                  Consultar
                </Button>
              </Col>
            </Row>
          </Form>
          {muestraResultados ? (
            <>
              <Divider />
              <Row gutter={[16, 16]} align="middle" justify="space-between">
                <Col>
                  <h2>
                    Medicos registrados
                    {muestraResultados ? totalBandeja(totalTabla) : null}
                  </h2>
                </Col>
                <Col>
                  <Row gutter={[16, 16]} justify="end">
                    <Col>
                      <Search
                        placeholder="Buscar en resultados"
                        enterButton
                        onChange={(e) => {
                          setSearchText(e.target.value);
                        }}
                      />
                    </Col>
                    <Col>
                      <Button
                        type="default"
                        icon={<DownloadOutlined />}
                        disabled={true}
                      >
                        Descargar
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Table
                columns={columns}
                dataSource={dataTable}
                //rowSelection={rowSelection}
                //rowKey={(record) => record?.idPrestamo}
                /* pagination={{
                  // showTotal: (total) => `Total ${total} resultados`,
                  showTotal: (total) => setTotalTabla(total),
                  defaultPageSize: 10,
                  showSizeChanger: true
                }}
                scroll={{ y: 550 }} */
              />
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default BandejaMedicos;
