import React, { Component } from 'react';
import dynamic from 'next/dynamic'

export default function ContentZone(props) {

    function RenderModules() {
        let modulesToRender = [];
        let modules = props.modulesPerContentZone[props.name];

        modules.forEach(m => {
            let AgilityModule = dynamic(() => import ('../modules/' + m.moduleName));
            modulesToRender.push(<AgilityModule key={m.item.contentID} {...m.item} />);
        })

        return modulesToRender;
    }


    return (
        <div>
            <RenderModules />
        </div>
    )
}
