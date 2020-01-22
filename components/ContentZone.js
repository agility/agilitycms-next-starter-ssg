import React, { Component } from 'react';
import dynamic from 'next/dynamic'


export default function ContentZone(props) {
    function RenderModules() {
        let modulesToRender = [];
        let modules = props.page.zones[props.name];

        modules.forEach(m => {
            
            //Bug: when dynamic imports are used within the module, it doest not get outputted server-side
            //let AgilityModule = dynamic(() => import ('../modules/' + m.moduleName));

            let AgilityModule = require('../modules/' + m.moduleName + '.js').default;

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
