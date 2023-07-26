import React, { useState, useEffect } from "react"
import TreeViewData from "../treeview"

// *STYLES

const TreeCall = () => {
  let opt = {
    callback: (e) => {
      console.log("event callback", e)
    },
    search: (e) => {
      console.log("event search", e)
    },
    nodeSelected: (e) => {
      console.log("event selected", e)
    },
    tree: [
      { referencia: "1", descricao: "PAI UM", observacao: "Custo", icon: "pi pi-plus", children: [] },
      {
        referencia: "2",
        descricao: "PAI DOIS",
        observacao: "Parcial",
        icon: "pi pi-minus",
        children: [
          {
            referencia: "2-1",
            descricao: "FILHO UM ",
            observacao: "parcial-parcial",
            icon: "pi pi-minus",
            children: [
              {
                referencia: "2-1-1",
                descricao: "NETO UM",
                observacao: "Custo",
                icon: "pi pi-plus",
                children: [
                  {
                    referencia: "2-1-1-1",
                    descricao: "BISNETO UM",
                    observacao: "Custo",
                    icon: "pi pi-plus",
                    children: [
                      {
                        referencia: "2-1-1-1-1",
                        descricao: "TrisNeto UM",
                        observacao: "Custo",
                        icon: "pi pi-plus",
                        children: []
                      }
                    ]
                  },
                  {
                    referencia: "2-1-1-2",
                    descricao: "BISNETO DOIS",
                    observacao: "Custo",
                    icon: "pi pi-plus",
                    children: []
                  }
                ]
              },
              {
                referencia: "2-1-2",
                descricao: "NETO DOIS",
                observacao: "Custo",
                icon: "pi pi-plus",
                children: []
              }
            ]
          },
          {
            referencia: "2-2",
            descricao: "FILHO DOIS",
            observacao: "Custo",
            icon: "pi pi-plus",
            children: []
          }
        ]
      },
      {
        referencia: "3",
        descricao: "PAI TRES",
        observacao: "Custo",
        icon: "pi pi-plus",
        children: [
          {
            referencia: "3-1",
            descricao: "FILHO UM",
            observacao: "Custo",
            icon: "pi pi-plus",
            children: []
          },
          {
            referencia: "3-2",
            descricao: "FILHO DOIS",
            observacao: "Custo",
            icon: "pi pi-plus",
            children: []
          },
          {
            referencia: "3-3",
            descricao: "FILHO TRES",
            observacao: "Custo",
            icon: "pi pi-plus",
            children: []
          },
          {
            referencia: "3-4",
            descricao: "FILHO QUATRO",
            observacao: "Custo",
            icon: "pi pi-plus",
            children: [
              {
                referencia: "3-4-1",
                descricao: "NETO UM",
                observacao: "Custo",
                icon: "pi pi-plus",
                children: []
              },
              {
                referencia: "3-4-2",
                descricao: "NETO DOIS",
                observacao: "Custo",
                icon: "pi pi-filter",
                children: []
              }
            ]
          }
        ]
      },
      { referencia: "4", descricao: "Pai Quatro", observacao: "Custo", icon: "pi pi-dollar", children: [] }
    ]
  }

  return (
    <div>
      <TreeViewData
        props={{ tree: opt.tree, callback: opt.callback, search: opt.search, nodeSelected: opt.nodeSelected }}
      />
    </div>
  )
}

export default TreeCall
