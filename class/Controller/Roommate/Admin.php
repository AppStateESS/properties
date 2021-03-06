<?php

/*
 * See docs/AUTHORS and docs/COPYRIGHT for relevant info.
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * @author Matthew McNaney <mcnaney at gmail dot com>
 *
 * @license http://opensource.org/licenses/lgpl-3.0.html
 */

namespace properties\Controller\Roommate;

use Canopy\Request;

class Admin extends User
{

    protected function viewHtmlCommand(Request $request)
    {
        $this->backToList();
        $button = $this->addButtons();
        $react = $this->factory->reactView('roommatedelete');
        return $this->factory->view($this->id, true) . $react;
    }

    protected function listHtmlCommand(Request $request)
    {
        return $this->factory->reactView('roommatelist');
    }

    protected function listJsonCommand(\Canopy\Request $request)
    {
        $json['roommates'] = $this->factory->listing($request, false, true);
        $json['more_rows'] = $this->factory->more_rows;
        $json['admin'] = true;
        return $json;
    }

    protected function deleteCommand(Request $request)
    {
        $roommate = $this->factory->load($this->id);
        return $this->factory->delete($roommate);
    }

    public function getHtml(Request $request)
    {
        $this->adminButtons();
        return parent::getHtml($request);
    }

    private function addButtons()
    {
        $button = $this->deleteButton();
        \properties\Factory\NavBar::addItem($button);
    }

    private function deleteButton()
    {
        $id = $this->id;
        return <<<EOF
<button class="btn btn-sm btn-outline-danger navbar-btn" data-id="$id" id="delete-roommate"><i class="fa fa-times"></i>&nbsp;Delete roommate request</button>
EOF;
    }

}
