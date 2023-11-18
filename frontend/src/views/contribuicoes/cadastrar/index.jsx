import { useEffect } from "react";
import { Box, Stack } from "@mui/material";

import useContribuicoesCadastrarState from "../../../hooks/contribuicoes/useContribuicoesCadastrarState";

import Styles from "./style";
import Application from "../../../components/application";
import MyLoading from "../../../components/myLoading";
import MyLabel from "../../../components/myLabel";
import MyPanel from "../../../components/myPanel";
import MyInput from "../../../components/myInput";
import MySelect from "../../../components/mySelect";
import { useParams } from "react-router-dom";
import MyButton from "../../../components/myButton";
import MyDataInput from "../../../components/myDataInput";

const ContribuicoesCadastrar = () => {
  const states = useContribuicoesCadastrarState();
  let { id } = useParams();

  useEffect(() => {
    states.instancia.set(id);
  }, []);

  let style = Styles();

  return (
    <Application>
      <Stack spacing={2}>
        <MyLoading render={states.submit.value} />
        <MyLabel
          sx={style.title}
          component="h1"
          text="Cadastrar Contribuições"
        />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <MyPanel>
            <Stack spacing={2}>
              <Stack spacing={2} direction="row">
                <Box sx={{ width: "270px" }}>
                  <MySelect
                    id="tipo"
                    label="Tipo"
                    options={[
                      { id: "mensal", nome: "Mensal" },
                      { id: "terceiro", nome: "Terceiro" },
                      { id: "outro", nome: "Outro" },
                    ]}
                    value={states.tipo.value}
                    onChange={(e) => states.tipo.set(e.target.value)}
                  />
                </Box>

                <Box sx={{ width: "270px" }}>
                  <MySelect
                    id="referencia"
                    label="Referencia"
                    options={[
                      { id: 0, nome: "Outro" },
                      { id: 1, nome: "Janeiro" },
                      { id: 2, nome: "Fevereiro" },
                      { id: 3, nome: "Março" },
                      { id: 4, nome: "Abril" },
                      { id: 5, nome: "Maio" },
                      { id: 6, nome: "Junho" },
                      { id: 7, nome: "Julho" },
                      { id: 8, nome: "Agosto" },
                      { id: 9, nome: "Setembro" },
                      { id: 10, nome: "Outubro" },
                      { id: 11, nome: "Novembro" },
                      { id: 12, nome: "Dezembro" },
                      { id: 13, nome: "Decimo-Terceiro" },
                    ]}
                    value={states.referencia.value}
                    onChange={(e) => states.referencia.set(e.target.value)}
                  />
                </Box>
              </Stack>
              <Stack spacing={2} direction="row">
                <MyDataInput
                  label='Data do pagamento'
                  value={states.data.value}
                  onChange={(newValue) => states.data.set(newValue)}
                />
                <MyInput
                  type="number"
                  id="valor"
                  label="Valor"
                  value={states.valor.value}
                  onChange={(e) => states.valor.set(e.target.value)}
                />
              </Stack>
              <MyInput
                type="text"
                id="descricao"
                label="Descricao"
                value={states.descricao.value}
                onChange={(e) => states.descricao.set(e.target.value)}
              />
              <MyButton
                onClick={() => states.submit.set()}
                text="Cadastrar"
                variant="contained"
              />
            </Stack>
          </MyPanel>
        </Box>
      </Stack>
    </Application>
  );
};

export default ContribuicoesCadastrar;
