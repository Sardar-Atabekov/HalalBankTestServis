import React, { useState, useEffect } from "react";
import { getData } from "../../functions/requests";
import { deleteAlert } from "./../../functions/alert";
import Loading from "./../../components/loading/loading";
import NavBar from "./../../components/navbar/navbar";
import Header from "./../../components/header/header";
import Footer from "./../../components/footer/footer";
import Title from "./../../components/title/title";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import "./projects.css";

const Projects = () => {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = () => {
    getData("project/").then((res) => {
      console.log(res);
      setProjects(res);
      setLoading(true);
    });
  };

  const deleteMessage = (id, name) => {
    deleteAlert(
      `Вы уверены что хотите удалить проект ${name}?`,
      "Проект удалена",
      `project/update_destroy/${id}/`,
      getProjects
    );
  };
  return (
    <div className="wrapper">
      <NavBar />
      <div className="main-container">
        <Header />
        {loading ? (
          <div className="content">
            <Title>Проекты</Title>
            <Table striped className={"mb-5 table-3 tables"}>
              <thead>
                <tr>
                  <th className={"thead-item"}>Наименование</th>
                  <th className={"thead-item"}>Владелец проекта</th>
                  <th className={"thead-item"}>ПМ проекта</th>
                  <th className={"thead-item"}>Trello</th>
                  <th className={"thead-item"}>Telegram</th>
                  <th className={"thead-item"}>Статус</th>
                  <th colSpan={2} className={"thead-item"}>
                    Действия
                  </th>
                </tr>
              </thead>
              {/* <tbody className={"tbody"}>
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td data-th="Наименование" className={"tbody-item"}>
                      {project.name}
                    </td>
                    <td data-th="Владелец продукта" className={"tbody-item"}>
                      {project.pm.name}
                    </td>
                    <td data-th="ПМ проекта" className={"tbody-item"}>
                      {project.count}
                    </td>
                    <td data-th="Trello" className={"tbody-item"}>
                      <a
                        href={project.trello}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={project.trello}
                      >
                        {project.name}
                      </a>
                    </td>
                    <td data-th="Telegram" className={"tbody-item"}>
                      <a
                        href={project.telegram}
                        aria-label={project.name}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {project.name}
                      </a>
                    </td>
                    <td data-th="Статус" className={"tbody-item"}>
                      {project.status}
                    </td>
                    <td className={"tbody-item item-more"}>
                      <Link to={`/project/${project.id}`}>Подробное</Link>
                    </td>
                    <td
                      onClick={() => deleteMessage(project.id, project.name)}
                      className={"tbody-item item-delete"}
                    >
                      Удалить
                    </td>
                  </tr>
                ))}
              </tbody> */}
            </Table>
          </div>
        ) : // <Loading />
        null}
        <Footer />
      </div>
    </div>
  );
};
export default Projects;
